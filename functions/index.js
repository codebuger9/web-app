/* eslint-disable promise/no-nesting */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addNotificationOnLike = functions.firestore
  .document('posts/{postId}/likes/{userId}')
  .onCreate((snapshot, context) => {
    var postId = context.params.postId;

    const newLike = snapshot.data();

    return admin
      .firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((postDoc) => {
        var post = postDoc.data();

        // Don't notify user if he's liked his own post
        if (post.user.id === newLike.user.id) {
          return null;
        }

        var notification = {
          type: 0,
          dateCreated: admin.firestore.FieldValue.serverTimestamp(),
          user: newLike.user,
          postId: postId,
          postPictureURL: post.pictureURLs[0],
          read: false,
        };

        return admin
          .firestore()
          .collection('users')
          .doc(post.user.id)
          .collection('notifications')
          .add(notification)
          .then(() => null);
      });
  });

exports.addNotificationOnComment = functions.firestore
  .document('posts/{postId}/comments/{commentId}')
  .onCreate((snapshot, context) => {
    var postId = context.params.postId;
    var commentId = context.params.commentId;

    const newComment = snapshot.data();

    return admin
      .firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((postDoc) => {
        var post = postDoc.data();

        // Don't notify user if he's commented on his own post
        if (post.user.id === newLike.user.id) {
          return null;
        }

        var notification = {
          type: 1,
          dateCreated: admin.firestore.FieldValue.serverTimestamp(),
          user: newComment.user,
          postId: postId,
          postPictureURL: post.pictureURLs[0],
          commentId: commentId,
          commentContent: newComment.content,
          read: false,
        };

        return admin
          .firestore()
          .collection('users')
          .doc(newComment.postUserId)
          .collection('notifications')
          .add(notification)
          .then(() => null);
      });
  });

exports.addNotificationOnOffer = functions.firestore
  .document('users/{userId}/posts/{postId}/offers/{offerId}')
  .onCreate((snapshot, context) => {
    const newOffer = snapshot.data();
    var offerId = context.params.offerId;

    var notification = {
      type: 2,
      dateCreated: admin.firestore.FieldValue.serverTimestamp(),
      user: newOffer.user,
      postId: newOffer.postId,
      postPictureURL: newOffer.postPictureURL,
      offerId: offerId,
      offerValue: newOffer.value,
      read: false,
    };

    return admin
      .firestore()
      .collection('users')
      .doc(newOffer.postUserId)
      .collection('notifications')
      .add(notification)
      .then(() => null);
  });

exports.updateLikesCountOnNewLike = functions.firestore
  .document('posts/{postId}/likes/{userId}')
  .onWrite((change, context) => {
    var postId = context.params.postId;

    var updateLikesCountBatch = admin.firestore().batch();

    return admin
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('likes')
      .get()
      .then((querySnapshot) => {
        var likesCount = querySnapshot.size;

        return admin
          .firestore()
          .collection('posts')
          .doc(postId)
          .get()
          .then((postDoc) => {
            var post = postDoc.data();

            var postRef = postDoc.ref;
            updateLikesCountBatch.update(postRef, {likesCount: likesCount});

            return admin
              .firestore()
              .collection('users')
              .doc(post.user.id)
              .collection('posts')
              .doc(postId)
              .get()
              .then((userPostDoc) => {
                var userPostRef = userPostDoc.ref;

                updateLikesCountBatch.update(userPostRef, {
                  likesCount: likesCount,
                });

                return updateLikesCountBatch
                  .commit()
                  .then(
                    (result) => {
                      return result;
                    },
                    (error) => {
                      console.error(error);
                    }
                  )
                  .catch((error) => {
                    console.error(error);
                  });
              });
          });
      });
  });

exports.updateOffersCountOnNewOffer = functions.firestore
  .document('users/{userId}/posts/{postId}/offers/{offerId}')
  .onWrite((change, context) => {
    var userId = context.params.userId;
    var postId = context.params.postId;

    var updateOffersCountBatch = admin.firestore().batch();

    return admin
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('posts')
      .doc(postId)
      .collection('offers')
      .get()
      .then((querySnapshot) => {
        var offersCount = querySnapshot.size;

        // Update offers count in posts
        var postRef = admin.firestore().collection('posts').doc(postId);

        updateOffersCountBatch.update(
          postRef,
          {offersCount: offersCount},
          {merge: true}
        );

        // Update offers count in user posts
        var userPostRef = admin
          .firestore()
          .collection('users')
          .doc(userId)
          .collection('posts')
          .doc(postId);

        updateOffersCountBatch.update(
          userPostRef,
          {offersCount: offersCount},
          {merge: true}
        );

        return updateOffersCountBatch
          .commit()
          .then(
            (result) => {
              return result;
            },
            (error) => {
              console.error(error);
            }
          )
          .catch((error) => {
            console.error(error);
          });
      });
  });

exports.updateDiscussionsCountOnNewDiscussion = functions.firestore
  .document('posts/{postId}/discussions/{discussionId}')
  .onWrite((change, context) => {
    var postId = context.params.postId;

    var updateDiscussionsCountBatch = admin.firestore().batch();

    return admin
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('discussions')
      .get()
      .then((querySnapshot) => {
        var discussionsCount = querySnapshot.size;

        return admin
          .firestore()
          .collection('posts')
          .doc(postId)
          .get()
          .then((postDoc) => {
            var post = postDoc.data();

            // Update discussions count in posts
            var postRef = admin.firestore().collection('posts').doc(post.id);

            updateDiscussionsCountBatch.update(
              postRef,
              {discussionsCount: discussionsCount},
              {merge: true}
            );

            // Update discussions count in user posts
            var userPostRef = admin
              .firestore()
              .collection('users')
              .doc(post.user.id)
              .collection('posts')
              .doc(post.id);

            updateDiscussionsCountBatch.update(
              userPostRef,
              {discussionsCount: discussionsCount},
              {merge: true}
            );

            return updateDiscussionsCountBatch
              .commit()
              .then(
                (result) => {
                  return result;
                },
                (error) => {
                  console.error(error);
                }
              )
              .catch((error) => {
                console.error(error);
              });
          });
      });
  });

exports.addPost = functions.firestore
  .document('users/{userId}/posts/{postId}')
  .onCreate((snapshot, context) => {
    const newUserPost = snapshot.data();

    return admin
      .firestore()
      .collection('users')
      .doc(newUserPost.user.id)
      .collection('posts')
      .get()
      .then((querySnapshot) => {
        var postsCount = querySnapshot.size;

        var updatePostsCountBatch = admin.firestore().batch();

        // Update posts count in user
        var userRef = admin
          .firestore()
          .collection('users')
          .doc(newUserPost.user.id);

        updatePostsCountBatch.update(
          userRef,
          {postsCount: postsCount},
          {merge: true}
        );

        // Update posts count in shop
        var shopRef = admin
          .firestore()
          .collection('shops')
          .doc(newUserPost.shop.id);

        updatePostsCountBatch.update(
          shopRef,
          {postsCount: postsCount},
          {merge: true}
        );

        return updatePostsCountBatch
          .commit()
          .then(
            (result) => {
              return result;
            },
            (error) => {
              console.error(error);
            }
          )
          .catch((error) => {
            console.error(error);
          });
      });
  });

exports.deletePost = functions.firestore
  .document('users/{userId}/posts/{postId}')
  .onDelete((snapshot, context) => {
    const deletedPost = snapshot.data();

    var promises = [];

    // Update posts count when post is deleted
    var updatePostsCountPromise = new Promise((resolve, reject) => {
      admin
        .firestore()
        .collection('users')
        .doc(deletedPost.user.id)
        .collection('posts')
        .get()
        .then(
          (querySnapshot) => {
            var postsCount = querySnapshot.size;

            var updatePostsCountBatch = admin.firestore().batch();

            // Update posts count in user
            var userRef = admin
              .firestore()
              .collection('users')
              .doc(deletedPost.user.id);

            updatePostsCountBatch.update(
              userRef,
              {postsCount: postsCount},
              {merge: true}
            );

            // Update posts count in shop
            var shopRef = admin
              .firestore()
              .collection('shops')
              .doc(deletedPost.shop.id);

            updatePostsCountBatch.update(
              shopRef,
              {postsCount: postsCount},
              {merge: true}
            );

            return updatePostsCountBatch
              .commit()
              .then(
                (result) => {
                  resolve();
                  return result;
                },
                (error) => {
                  console.error(error);
                  reject(error);
                }
              )
              .catch((error) => {
                console.error(error);
                reject(error);
              });
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        )
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });

    promises.push(updatePostsCountPromise);

    // Delete comments mappings
    var deleteCommentsMappingsPromise = new Promise((resolve, reject) => {
      admin
        .firestore()
        .collection('users')
        .get()
        .then((usersQuerySnapshot) => {
          var commentsMappingsPromises = [];
          var toDeleteCommentMappingDocRefs = [];

          // For each user, check if any comments mappings point to the deleted post
          usersQuerySnapshot.forEach((userDoc) => {
            commentsMappingsPromises.push(
              new Promise((resolve, reject) => {
                admin
                  .firestore()
                  .collection('users')
                  .doc(userDoc.id)
                  .collection('commentsMapping')
                  .get()
                  .then((commentsMappingsQuerySnapshot) => {
                    commentsMappingsQuerySnapshot.forEach(
                      (commentMappingDoc) => {
                        var commentMapping = commentMappingDoc.data();
                        if (commentMapping.postId === deletedPost.id) {
                          toDeleteCommentMappingDocRefs.push(
                            commentMappingDoc.ref
                          );
                        }
                      }
                    );

                    resolve();
                    return;
                  })
                  .catch((error) => {
                    console.error(error);
                    reject(error);
                  });
              })
            );
          });

          return Promise.all(commentsMappingsPromises).then(() => {
            var deleteCommentsMappingsBatch = admin.firestore().batch();

            toDeleteCommentMappingDocRefs.forEach((commentMappingDocRef) => {
              deleteCommentsMappingsBatch.delete(commentMappingDocRef);
            });

            return deleteCommentsMappingsBatch
              .commit()
              .then(
                (result) => {
                  resolve();
                  return result;
                },
                (error) => {
                  console.error(error);
                  reject(error);
                }
              )
              .catch((error) => {
                console.error(error);
                reject(error);
              });
          });
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });

    promises.push(deleteCommentsMappingsPromise);

    // Delete pictures from Firebase storage when post is deleted
    var pictureNo = 1;

    deletedPost.pictureURLs.forEach(
      () => {
        var deletePicturesPromise = new Promise((resolve, reject) => {
          var path = `${deletedPost.user.id}/shop-${deletedPost.shop.id}/${
            deletedPost.id
          }/post-${pictureNo++}-pictureURL`;

          admin
            .storage()
            .bucket()
            .file(path)
            .delete()
            .then(
              () => {
                resolve();
                return;
              },
              (error) => {
                console.error(error);
              }
            )
            .catch((error) => {
              console.error(error);
            });
        });

        promises.push(deletePicturesPromise);
      },
      (error) => {
        console.error(error);
      }
    );

    return Promise.all(promises);
  });

exports.updatePost = functions.firestore
  .document('posts/{postId}')
  .onUpdate((change, context) => {
    // Updated post
    const updatedPost = change.after.data();

    var updatedPostBatch = admin.firestore().batch();

    var updatePostInFavoritePostsPromise = new Promise((resolve, reject) => {
      try {
        admin
          .firestore()
          .collection('users')
          .doc(updatedPost.user.id)
          .collection('favoritePostsMapping')
          .get()
          .then(
            (querySnapshot) => {
              querySnapshot.forEach((favoritePostMappingDoc) => {
                var favoritePostMapping = favoritePostMappingDoc.data();

                var userId = favoritePostMapping.userId;
                var favoritePostId = favoritePostMapping.postId;

                var favoritePostRef = admin
                  .firestore()
                  .collection('users')
                  .doc(userId)
                  .collection('favoritePosts')
                  .doc(favoritePostId);

                updatedPostBatch.update(favoritePostRef, updatedPost, {
                  merge: true,
                });
              });

              resolve();
              return;
            },
            (error) => {
              console.error(error);
              reject(error);
            }
          )
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

    return Promise.all([updatePostInFavoritePostsPromise]).then(() => {
      return updatedPostBatch
        .commit()
        .then(
          (result) => {
            return result;
          },
          (error) => {
            console.error(error);
          }
        )
        .catch((error) => {
          console.error(error);
        });
    });
  });

exports.addShop = functions.firestore
  .document('shops/{shopId}')
  .onCreate((snapshot, context) => {
    const newShop = snapshot.data();

    if (!newShop.mall) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return admin
      .firestore()
      .collection('shops')
      .get()
      .then((querySnapshot) => {
        var shopsCount = 0;

        querySnapshot.forEach((shopDoc) => {
          var shop = shopDoc.data();
          if (shop.mall && shop.mall.id === newShop.mall.id) {
            shopsCount++;
          }
        });

        var updateShopsCountBatch = admin.firestore().batch();

        // Update shops count in malls
        var mallRef = admin
          .firestore()
          .collection('malls')
          .doc(newShop.mall.id);

        updateShopsCountBatch.update(
          mallRef,
          {shopsCount: shopsCount},
          {merge: true}
        );

        return updateShopsCountBatch
          .commit()
          .then(
            (result) => {
              return result;
            },
            (error) => {
              console.error(error);
            }
          )
          .catch((error) => {
            console.error(error);
          });
      });
  });

exports.deleteShop = functions.firestore
  .document('shops/{shopId}')
  .onDelete((snapshot, context) => {
    const deletedShop = snapshot.data();

    // Delete shop picture from Firebase storage when shop is deleted
    var deleteShopPicturePromise = new Promise((resolve, reject) => {
      var path = `${deletedShop.user.id}/shop-${deletedShop.id}/PictureURL`;

      return admin
        .storage()
        .bucket()
        .file(path)
        .delete()
        .then(
          () => {
            resolve();
            return;
          },
          (error) => {
            console.error(error);
          }
        )
        .catch((error) => {
          console.error(error);
        });
    });

    var deletePostsPicturesPromise = new Promise((resolve, reject) => {
      return admin
        .firestore()
        .collection('users')
        .doc(deletedShop.user.id)
        .collection('posts')
        .get()
        .then((querySnapshot) => {
          var posts = [];

          // Get ids for all affected posts
          querySnapshot.forEach((postDoc) => {
            posts.push(postDoc.data());
          });

          var deletePicturesPromises = [];

          posts.forEach((post) => {
            var pictureNo = 1;

            post.pictureURLs.forEach(
              () => {
                var deletePicturesPromise = new Promise((resolve, reject) => {
                  var path = `${post.user.id}/shop-${post.shop.id}/${
                    post.id
                  }/post-${pictureNo++}-pictureURL`;

                  admin
                    .storage()
                    .bucket()
                    .file(path)
                    .delete()
                    .then(
                      () => {
                        resolve();
                        return;
                      },
                      (error) => {
                        console.error(error);
                      }
                    )
                    .catch((error) => {
                      console.error(error);
                    });
                });

                deletePicturesPromises.push(deletePicturesPromise);
              },
              (error) => {
                console.error(error);
              }
            );
          });

          return Promise.all(deletePicturesPromises).then(
            () => {
              resolve();
              return;
            },
            (error) => {
              console.error(error);
            }
          );
        });
    });

    var updateShopsCountPromise = new Promise((resolve, reject) => {
      return admin
        .firestore()
        .collection('shops')
        .get()
        .then((querySnapshot) => {
          var shopsCount = 0;

          querySnapshot.forEach((shopDoc) => {
            var shop = shopDoc.data();
            if (shop.mall && shop.mall.id === deletedShop.mall.id) {
              shopsCount++;
            }
          });

          var updateShopsCountBatch = admin.firestore().batch();

          // Update shops count in malls
          var mallRef = admin
            .firestore()
            .collection('malls')
            .doc(deletedShop.mall.id);

          updateShopsCountBatch.update(
            mallRef,
            {shopsCount: shopsCount},
            {merge: true}
          );

          return updateShopsCountBatch
            .commit()
            .then(
              (result) => {
                resolve();
                return result;
              },
              (error) => {
                console.error(error);
                reject(error);
              }
            )
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        });
    });

    return Promise.all([
      deleteShopPicturePromise,
      deletePostsPicturesPromise,
      updateShopsCountPromise,
    ]);
  });

exports.updateShop = functions.firestore
  .document('shops/{shopId}')
  .onUpdate((change, context) => {
    // Updated shop
    const updatedShop = change.after.data();

    var updateShopBatch = admin.firestore().batch();

    var updateShopInPostsPromise = new Promise((resolve, reject) => {
      admin
        .firestore()
        .collection('users')
        .doc(updatedShop.user.id)
        .collection('posts')
        .get()
        .then(
          (querySnapshot) => {
            var postIds = [];

            // Get ids for all affected posts
            querySnapshot.forEach((postDoc) => {
              postIds.push(postDoc.id);
            });

            postIds.forEach((postId) => {
              // Update shop details in list of user's posts
              var userPostDocRef = admin
                .firestore()
                .collection('users')
                .doc(updatedShop.user.id)
                .collection('posts')
                .doc(postId);

              updateShopBatch.update(
                userPostDocRef,
                {
                  shop: {
                    id: updatedShop.id,
                    name: updatedShop.name,
                    pictureURL: updatedShop.pictureURL,
                  },
                },
                {merge: true}
              );

              // Update shop details in list of all posts
              var postDocRef = admin
                .firestore()
                .collection('posts')
                .doc(postId);

              updateShopBatch.update(
                postDocRef,
                {
                  shop: {
                    id: updatedShop.id,
                    name: updatedShop.name,
                    pictureURL: updatedShop.pictureURL,
                  },
                },
                {merge: true}
              );
            });

            resolve();
            return;
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        )
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });

    var updateShopInFavoritePostsPromise = new Promise((resolve, reject) => {
      try {
        admin
          .firestore()
          .collection('users')
          .doc(updatedShop.user.id)
          .collection('favoritePostsMapping')
          .get()
          .then(
            (querySnapshot) => {
              querySnapshot.forEach((favoritePostMappingDoc) => {
                var favoritePostMapping = favoritePostMappingDoc.data();

                var userId = favoritePostMapping.userId;
                var favoritePostId = favoritePostMapping.postId;

                var favoritePostRef = admin
                  .firestore()
                  .collection('users')
                  .doc(userId)
                  .collection('favoritePosts')
                  .doc(favoritePostId);

                updateShopBatch.update(
                  favoritePostRef,
                  {
                    shop: {
                      id: updatedShop.id,
                      name: updatedShop.name,
                      pictureURL: updatedShop.pictureURL,
                    },
                  },
                  {merge: true}
                );
              });

              resolve();
              return;
            },
            (error) => {
              console.error(error);
              reject(error);
            }
          )
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

    return Promise.all([
      updateShopInPostsPromise,
      updateShopInFavoritePostsPromise,
    ]).then(() => {
      return updateShopBatch
        .commit()
        .then(
          (result) => {
            return result;
          },
          (error) => {
            console.error(error);
          }
        )
        .catch((error) => {
          console.error(error);
        });
    });
  });

exports.updateUser = functions.firestore
  .document('users/{userId}')
  .onUpdate((change, context) => {
    // Updated user
    const previousUser = change.before.data();
    const updatedUser = change.after.data();

    // Check if relevant properties have changed
    if (
      previousUser.name === updatedUser.name &&
      previousUser.pictureURL === updatedUser.pictureURL &&
      previousUser.currency === updatedUser.currency &&
      previousUser.location.latitude === updatedUser.location.latitude &&
      previousUser.location.longitude === updatedUser.location.longitude
    ) {
      return;
    }

    var updateUserBatch = admin.firestore().batch();

    var updateUserInPostsPromise = new Promise((resolve, reject) => {
      try {
        admin
          .firestore()
          .collection('users')
          .doc(updatedUser.id)
          .collection('posts')
          .get()
          .then(
            (querySnapshot) => {
              var postIds = [];

              // Get ids for all affected posts
              querySnapshot.forEach((postDoc) => {
                postIds.push(postDoc.id);
              });

              postIds.forEach((postId) => {
                // Update user details in list of user's posts
                var userPostDocRef = admin
                  .firestore()
                  .collection('users')
                  .doc(updatedUser.id)
                  .collection('posts')
                  .doc(postId);

                updateUserBatch.update(
                  userPostDocRef,
                  {
                    user: {
                      id: updatedUser.id,
                      name: updatedUser.name,
                      pictureURL: updatedUser.pictureURL,
                      currency: updatedUser.currency,
                      location: updatedUser.location,
                    },
                  },
                  {merge: true}
                );

                // Update user details in list of all posts
                var postDocRef = admin
                  .firestore()
                  .collection('posts')
                  .doc(postId);

                updateUserBatch.update(
                  postDocRef,
                  {
                    user: {
                      id: updatedUser.id,
                      name: updatedUser.name,
                      pictureURL: updatedUser.pictureURL,
                      currency: updatedUser.currency,
                      location: updatedUser.location,
                    },
                  },
                  {merge: true}
                );
              });

              resolve();
              return;
            },
            (error) => {
              console.error(error);
              reject(error);
            }
          )
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

    var updateUserInShopPromise = new Promise((resolve, reject) => {
      try {
        var shopDocRef = admin
          .firestore()
          .collection('shops')
          .doc(updatedUser.shop.id);

        updateUserBatch.update(
          shopDocRef,
          {
            user: {
              id: updatedUser.id,
              name: updatedUser.name,
              pictureURL: updatedUser.pictureURL,
            },
          },
          {merge: true}
        );

        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

    var updateUserInMallPromise = new Promise((resolve, reject) => {
      try {
        if (!updatedUser.mall) {
          resolve();
          return;
        }

        var mallDocRef = admin
          .firestore()
          .collection('malls')
          .doc(updatedUser.mall.id);

        updateUserBatch.update(
          mallDocRef,
          {
            owner: {
              id: updatedUser.id,
              name: updatedUser.name,
              pictureURL: updatedUser.pictureURL,
            },
          },
          {merge: true}
        );

        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

    var updateUserInCommentsPromise = new Promise((resolve, reject) => {
      try {
        admin
          .firestore()
          .collection('users')
          .doc(updatedUser.id)
          .collection('commentsMapping')
          .get()
          .then(
            (querySnapshot) => {
              querySnapshot.forEach((commentMappingDoc) => {
                var commentMapping = commentMappingDoc.data();

                var postId = commentMapping.postId;
                var commentId = commentMapping.commentId;

                var commentRef = admin
                  .firestore()
                  .collection('posts')
                  .doc(postId)
                  .collection('comments')
                  .doc(commentId);

                updateUserBatch.update(
                  commentRef,
                  {
                    user: {
                      id: updatedUser.id,
                      name: updatedUser.name,
                      pictureURL: updatedUser.pictureURL,
                    },
                  },
                  {merge: true}
                );
              });

              resolve();
              return;
            },
            (error) => {
              console.error(error);
              reject(error);
            }
          )
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

    var updateUserInFavoritePostsPromise = new Promise((resolve, reject) => {
      try {
        admin
          .firestore()
          .collection('users')
          .doc(updatedUser.id)
          .collection('favoritePostsMapping')
          .get()
          .then(
            (querySnapshot) => {
              querySnapshot.forEach((favoritePostMappingDoc) => {
                var favoritePostMapping = favoritePostMappingDoc.data();

                var userId = favoritePostMapping.userId;
                var favoritePostId = favoritePostMapping.postId;

                var favoritePostRef = admin
                  .firestore()
                  .collection('users')
                  .doc(userId)
                  .collection('favoritePosts')
                  .doc(favoritePostId);

                updateUserBatch.update(
                  favoritePostRef,
                  {
                    user: {
                      id: updatedUser.id,
                      name: updatedUser.name,
                      pictureURL: updatedUser.pictureURL,
                      currency: updatedUser.currency,
                      location: updatedUser.location,
                    },
                  },
                  {merge: true}
                );
              });

              resolve();
              return;
            },
            (error) => {
              console.error(error);
              reject(error);
            }
          )
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

    var updateUserInReviewsPromise = new Promise((resolve, reject) => {
      try {
        admin
          .firestore()
          .collection('users')
          .doc(updatedUser.id)
          .collection('reviewsMapping')
          .get()
          .then(
            (querySnapshot) => {
              querySnapshot.forEach((reviewMappingDoc) => {
                var reviewMapping = reviewMappingDoc.data();

                var userId = reviewMapping.userId;
                var reviewId = reviewMapping.reviewId;

                var reviewRef = admin
                  .firestore()
                  .collection('users')
                  .doc(userId)
                  .collection('reviews')
                  .doc(reviewId);

                updateUserBatch.update(
                  reviewRef,
                  {
                    user: {
                      id: updatedUser.id,
                      name: updatedUser.name,
                      pictureURL: updatedUser.pictureURL,
                    },
                  },
                  {merge: true}
                );
              });

              resolve();
              return;
            },
            (error) => {
              console.error(error);
              reject(error);
            }
          )
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

    var updateUserInOffersPromise = new Promise((resolve, reject) => {
      try {
        admin
          .firestore()
          .collection('users')
          .doc(updatedUser.id)
          .collection('offersMapping')
          .get()
          .then(
            (querySnapshot) => {
              querySnapshot.forEach((offerMappingDoc) => {
                var offerMapping = offerMappingDoc.data();

                var userId = offerMapping.userId;
                var postId = offerMapping.postId;
                var offerId = offerMapping.offerId;

                var commentRef = admin
                  .firestore()
                  .collection('users')
                  .doc(userId)
                  .collection('posts')
                  .doc(postId)
                  .collection('offers')
                  .doc(offerId);

                updateUserBatch.update(
                  commentRef,
                  {
                    user: {
                      id: updatedUser.id,
                      name: updatedUser.name,
                      pictureURL: updatedUser.pictureURL,
                    },
                  },
                  {merge: true}
                );
              });

              resolve();
              return;
            },
            (error) => {
              console.error(error);
              reject(error);
            }
          )
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

    // eslint-disable-next-line consistent-return
    return Promise.all([
      updateUserInPostsPromise,
      updateUserInShopPromise,
      updateUserInMallPromise,
      updateUserInCommentsPromise,
      updateUserInFavoritePostsPromise,
      updateUserInReviewsPromise,
      updateUserInOffersPromise,
    ]).then(() => {
      return updateUserBatch
        .commit()
        .then(
          (result) => {
            return result;
          },
          (error) => {
            console.error(error);
          }
        )
        .catch((error) => {
          console.error(error);
        });
    });
  });
