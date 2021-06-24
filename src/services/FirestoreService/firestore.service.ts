import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';

import * as firebase from 'firebase';

import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

import {Enums} from 'src/models/Enums';
import {UserDetails} from 'src/models/UserDetails';
import {User} from 'src/models/User';
import {MallDetails} from 'src/models/MallDetails';
import {Mall} from 'src/models/Mall';
import {ShopDetails} from 'src/models/ShopDetails';
import {Shop} from 'src/models/Shop';
import {Post} from 'src/models/Post';
import {Comment} from 'src/models/Comment';
import {Review} from 'src/models/Review';
import {CommentMapping} from 'src/models/CommentMapping';
import {FavoritePostMapping} from 'src/models/FavoritePostMapping';
import {ReviewMapping} from 'src/models/ReviewMapping';
import {Offer} from 'src/models/Offer';
import {OfferMapping} from 'src/models/OfferMapping';
import {OfferSent} from 'src/models/OfferSent';
import {Discussion} from 'src/models/Discussion';
import {Message} from 'src/models/Message';
import {Notification} from 'src/models/Notification';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private readonly afs: AngularFirestore) {}

  getNewId(): string {
    return this.afs.createId();
  }

  getUser(userId: string): Observable<UserDetails> {
    return this.afs
      .collection<UserDetails>('users')
      .doc<UserDetails>(userId)
      .valueChanges();
  }

  addUser(user: UserDetails) {
    return new Promise((resolve, reject) => {
      this.afs
        .collection<UserDetails>('users')
        .doc(user.id)
        .set(user)
        .then(
          () => {
            resolve();
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        );
    });
  }

  updateUser(user: UserDetails) {
    return new Promise((resolve, reject) => {
      this.afs
        .collection<UserDetails>('users')
        .doc(user.id)
        .update(user)
        .then(
          () => {
            resolve();
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        );
    });
  }

  getMalls(): Observable<MallDetails[]> {
    return this.afs.collection<MallDetails>('malls').valueChanges();
  }

  getMall(mallId: string): Observable<MallDetails> {
    return this.afs
      .collection<MallDetails>('malls')
      .doc<MallDetails>(mallId)
      .valueChanges();
  }

  addMall(mall: MallDetails) {
    return new Promise((resolve, reject) => {
      var newMallBatch = firebase.firestore().batch();

      // Add mall to collection of all malls
      var allMallsDocRef = this.afs
        .collection<MallDetails>('malls')
        .doc(mall.id).ref;
      newMallBatch.set(allMallsDocRef, mall);

      // Add mall to user
      var userMallDocRef = this.afs.collection('users').doc(mall.owner.id).ref;
      newMallBatch.update(userMallDocRef, {
        mall: <Mall>{
          id: mall.id,
          name: mall.name,
          pictureURL: mall.pictureURL,
        },
      });

      newMallBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  updateMall(mall: MallDetails) {
    return new Promise((resolve, reject) => {
      var updateMallBatch = firebase.firestore().batch();

      // Update mall in collection of all malls
      var allMallsDocRef = this.afs
        .collection<MallDetails>('malls')
        .doc(mall.id).ref;

      updateMallBatch.update(allMallsDocRef, mall);

      // Update mall in user
      var userMallDocRef = this.afs.collection('users').doc(mall.owner.id).ref;

      updateMallBatch.update(userMallDocRef, {
        mall: <Mall>{
          id: mall.id,
          name: mall.name,
          pictureURL: mall.pictureURL,
        },
      });

      updateMallBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  deleteMall(mall: MallDetails) {
    return new Promise((resolve, reject) => {
      var deleteMallBatch = firebase.firestore().batch();

      // Delete mall in collection of all malls
      var deleteMallPromise = new Promise((resolve, reject) => {
        try {
          var allMallsDocRef = this.afs
            .collection<MallDetails>('malls')
            .doc(mall.id).ref;

          deleteMallBatch.delete(allMallsDocRef);

          resolve();
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });

      // Update shop details in user
      var updateMallInUserPromise = new Promise((resolve, reject) => {
        try {
          var userMallDocRef = this.afs.collection('users').doc(mall.owner.id)
            .ref;
          deleteMallBatch.update(userMallDocRef, {
            mall: <Mall>{},
          });

          resolve();
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });

      Promise.all([deleteMallPromise, updateMallInUserPromise]).then(() => {
        deleteMallBatch.commit().then(
          () => {
            resolve();
          },
          (error) => {
            console.error(error);
            reject();
          }
        );
      });
    });
  }

  getShops(): Observable<ShopDetails[]> {
    return this.afs
      .collection<ShopDetails>('shops', (ref) => ref.orderBy('name', 'asc'))
      .valueChanges();
  }

  getShop(shopId: string): Observable<ShopDetails> {
    return this.afs
      .collection<ShopDetails>('shops')
      .doc<ShopDetails>(shopId)
      .valueChanges();
  }

  addShop(shop: ShopDetails) {
    return new Promise((resolve, reject) => {
      var newShopBatch = firebase.firestore().batch();

      // Add shop to collection of all shops
      var allShopsDocRef = this.afs
        .collection<ShopDetails>('shops')
        .doc(shop.id).ref;
      newShopBatch.set(allShopsDocRef, shop);

      // Add shop to user
      var userShopDocRef = this.afs.collection('users').doc(shop.user.id).ref;
      newShopBatch.update(userShopDocRef, {
        shop: <Shop>{
          id: shop.id,
          name: shop.name,
          pictureURL: shop.pictureURL,
        },
      });

      newShopBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  updateShop(shop: ShopDetails) {
    return new Promise((resolve, reject) => {
      var updateShopBatch = firebase.firestore().batch();

      // Update shop to collection of all shops
      var allShopsDocRef = this.afs
        .collection<ShopDetails>('shops')
        .doc(shop.id).ref;
      updateShopBatch.update(allShopsDocRef, shop);

      // Update shop in user
      var userShopDocRef = this.afs.collection('users').doc(shop.user.id).ref;
      updateShopBatch.update(userShopDocRef, {
        shop: <Shop>{
          id: shop.id,
          name: shop.name,
          pictureURL: shop.pictureURL,
        },
      });

      updateShopBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  deleteShop(shop: ShopDetails) {
    return new Promise((resolve, reject) => {
      var deleteShopBatch = firebase.firestore().batch();

      // Delete shop in collection of all shops
      var deleteShopPromise = new Promise((resolve, reject) => {
        try {
          var allShopsDocRef = this.afs
            .collection<ShopDetails>('shops')
            .doc(shop.id).ref;
          deleteShopBatch.delete(allShopsDocRef);

          resolve();
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });

      // Update shop details in user
      var updateShopInUserPromise = new Promise((resolve, reject) => {
        try {
          var userShopDocRef = this.afs.collection('users').doc(shop.user.id)
            .ref;
          deleteShopBatch.update(userShopDocRef, {
            shop: <Shop>{},
          });

          resolve();
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });

      // Delete all posts from user
      var deleteUserPosts = new Promise((resolve, reject) => {
        try {
          this.afs
            .collection<UserDetails>('users')
            .doc(shop.user.id)
            .collection<Post>('posts')
            .valueChanges()
            .pipe(first())
            .subscribe((querySnapshot) => {
              var postIds = [];

              // Get ids for all affected posts
              querySnapshot.forEach((postDoc) => {
                postIds.push(postDoc.id);
              });

              postIds.forEach((postId) => {
                // Update shop details in list of user's posts
                var userPostDocRef = this.afs
                  .collection('users')
                  .doc(shop.user.id)
                  .collection('posts')
                  .doc(postId).ref;

                deleteShopBatch.delete(userPostDocRef);

                // Update shop details in list of all posts
                var postDocRef = this.afs.collection('posts').doc(postId).ref;
                deleteShopBatch.delete(postDocRef);
              });

              resolve();
            });
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });

      Promise.all([
        deleteShopPromise,
        updateShopInUserPromise,
        deleteUserPosts,
      ]).then(() => {
        deleteShopBatch.commit().then(
          () => {
            resolve();
          },
          (error) => {
            console.error(error);
            reject();
          }
        );
      });
    });
  }

  getProducts(): Observable<Post[]> {
    return this.afs
      .collection<Post>('posts', (ref) =>
        ref
          .orderBy('dateCreated', 'desc')
          .where('type', '==', Enums.PostType.Product.toString())
          .where('isPublished', '==', true)
      )
      .valueChanges();
  }

  getServices(): Observable<Post[]> {
    return this.afs
      .collection<Post>('posts', (ref) =>
        ref
          .orderBy('dateCreated', 'desc')
          .where('type', '==', Enums.PostType.Service.toString())
          .where('isPublished', '==', true)
      )
      .valueChanges();
  }

  getRequests(): Observable<Post[]> {
    return this.afs
      .collection<Post>('posts', (ref) =>
        ref
          .orderBy('dateCreated', 'desc')
          .where('type', '==', Enums.PostType.Request.toString())
          .where('isPublished', '==', true)
      )
      .valueChanges();
  }

  getUserPosts(userId: string): Observable<Post[]> {
    return this.afs
      .collection<UserDetails>('users')
      .doc(userId)
      .collection<Post>('posts', (ref) => ref.orderBy('dateCreated', 'desc'))
      .valueChanges();
  }

  getPost(postId: string) {
    return new Promise((resolve, reject) => {
      return this.afs
        .collection<Post>('posts')
        .doc(postId)
        .get()
        .pipe(first())
        .subscribe(
          (doc) => {
            resolve(doc.data());
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        );
    });
  }

  addPost(post: Post) {
    return new Promise((resolve, reject) => {
      post.dateCreated = firebase.firestore.FieldValue.serverTimestamp();

      var newPostBatch = firebase.firestore().batch();

      // Add post to collection of all posts
      var allPostsDocRef = this.afs.collection<Post>('posts').doc(post.id).ref;
      newPostBatch.set(allPostsDocRef, post);

      // Add post to collection of user's posts
      var userPostsDocRef = this.afs
        .collection('users')
        .doc(post.user.id)
        .collection('posts')
        .doc(post.id).ref;

      newPostBatch.set(userPostsDocRef, post);

      newPostBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  updatePost(post: Post) {
    return new Promise((resolve, reject) => {
      var updatePostBatch = firebase.firestore().batch();

      // Update post in collection of all posts
      var allPostsDocRef = this.afs.collection<Post>('posts').doc(post.id).ref;
      updatePostBatch.update(allPostsDocRef, post);

      // Update post in collection of user's posts
      var userPostsDocRef = this.afs
        .collection('users')
        .doc(post.user.id)
        .collection('posts')
        .doc(post.id).ref;

      updatePostBatch.update(userPostsDocRef, post);

      updatePostBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  deletePost(post: Post) {
    return new Promise((resolve, reject) => {
      var deletePostBatch = firebase.firestore().batch();

      // Delete post in collection of all posts
      var allPostsDocRef = this.afs.collection<Post>('posts').doc(post.id).ref;
      deletePostBatch.delete(allPostsDocRef);

      // Delete post in collection of user's posts
      var userPostsDocRef = this.afs
        .collection('users')
        .doc(post.user.id)
        .collection('posts')
        .doc(post.id).ref;

      deletePostBatch.delete(userPostsDocRef);

      deletePostBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  checkIfLikedPost(post: Post, user: User) {
    return new Promise((resolve, reject) => {
      this.afs
        .collection<Post>('posts')
        .doc(post.id)
        .collection('likes')
        .doc(user.id)
        .valueChanges()
        .pipe(first())
        .subscribe((data) => {
          resolve(data !== undefined);
        });
    });
  }

  likePost(post: Post, user: User) {
    return new Promise((resolve, reject) => {
      var likePostBatch = firebase.firestore().batch();

      // Like post in collection of all posts
      var allPostsDocRef = this.afs
        .collection<Post>('posts')
        .doc(post.id)
        .collection('likes')
        .doc(user.id).ref;

      likePostBatch.set(allPostsDocRef, {
        user: <User>{
          id: user.id,
          name: user.name,
          pictureURL: user.pictureURL,
        },
      });

      // Like post in collection of user's posts
      var userPostsDocRef = this.afs
        .collection('users')
        .doc(post.user.id)
        .collection('posts')
        .doc(post.id)
        .collection('likes')
        .doc(user.id).ref;

      likePostBatch.set(userPostsDocRef, {
        user: <User>{
          id: user.id,
          name: user.name,
          pictureURL: user.pictureURL,
        },
      });

      likePostBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  unlikePost(post: Post, user: User) {
    return new Promise((resolve, reject) => {
      var unlikePostBatch = firebase.firestore().batch();

      // Unlike post in collection of all posts
      var allPostsDocRef = this.afs
        .collection<Post>('posts')
        .doc(post.id)
        .collection('likes')
        .doc(user.id).ref;

      unlikePostBatch.delete(allPostsDocRef);

      // Unlike post in collection of user's posts
      var userPostsDocRef = this.afs
        .collection('users')
        .doc(post.user.id)
        .collection('posts')
        .doc(post.id)
        .collection('likes')
        .doc(user.id).ref;

      unlikePostBatch.delete(userPostsDocRef);

      unlikePostBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.afs
      .collection<Post>('posts')
      .doc(postId)
      .collection<Comment>('comments', (ref) =>
        ref.orderBy('dateCreated', 'asc')
      )
      .valueChanges(['added']);
  }

  addComment(postId: string, comment: Comment) {
    return new Promise((resolve, reject) => {
      comment.id = this.getNewId();
      comment.dateCreated = firebase.firestore.FieldValue.serverTimestamp();

      var addCommentBatch = firebase.firestore().batch();

      // Add comment to list of comments in post
      var commentDocRef = this.afs
        .collection<Post>('posts')
        .doc(postId)
        .collection<Comment>('comments')
        .doc(comment.id).ref;

      addCommentBatch.set(commentDocRef, comment);

      // Add comment mapping to post for when user is updated
      var commentMapping = <CommentMapping>{
        id: this.getNewId(),
        postId: postId,
        commentId: comment.id,
      };

      var commentMappingDocRef = this.afs
        .collection('users')
        .doc(comment.user.id)
        .collection('commentsMapping')
        .doc(commentMapping.id).ref;

      addCommentBatch.set(commentMappingDocRef, commentMapping);

      addCommentBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  checkIfFavoritePost(post: Post, user: User) {
    return new Promise((resolve, reject) => {
      this.afs
        .collection<UserDetails>('users')
        .doc(user.id)
        .collection('favoritePosts')
        .doc(post.id)
        .valueChanges()
        .pipe(first())
        .subscribe((data) => {
          resolve(data !== undefined);
        });
    });
  }

  addFavoritePost(post: Post, user: User) {
    return new Promise((resolve, reject) => {
      var addFavoritePostBatch = firebase.firestore().batch();

      // Add post to user's favorite posts list
      var favoritePostDocRef = this.afs
        .collection<UserDetails>('users')
        .doc(user.id)
        .collection('favoritePosts')
        .doc(post.id).ref;

      addFavoritePostBatch.set(favoritePostDocRef, post);

      // Add favorite post mapping to user's favorite posts for when user is updated
      var favoritePostMapping = <FavoritePostMapping>{
        userId: user.id,
        postId: post.id,
      };

      var favoritePostMappingDocRef = this.afs
        .collection('users')
        .doc(post.user.id)
        .collection('favoritePostsMapping')
        .doc(post.id).ref;

      addFavoritePostBatch.set(favoritePostMappingDocRef, favoritePostMapping);

      addFavoritePostBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  removeFavoritePost(post: Post, user: User) {
    return new Promise((resolve, reject) => {
      var removeFavoritePostBatch = firebase.firestore().batch();

      // Remove post from user's favorite posts list
      var favoritePostDocRef = this.afs
        .collection<UserDetails>('users')
        .doc(user.id)
        .collection('favoritePosts')
        .doc(post.id).ref;

      removeFavoritePostBatch.delete(favoritePostDocRef);

      // Remove favorite post mapping from user's favorite posts for when user is updated
      var favoritePostMappingDocRef = this.afs
        .collection('users')
        .doc(post.user.id)
        .collection('favoritePostsMapping')
        .doc(post.id).ref;

      removeFavoritePostBatch.delete(favoritePostMappingDocRef);

      removeFavoritePostBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  getReviews(userId: string): Observable<Review[]> {
    return this.afs
      .collection<UserDetails>('users')
      .doc(userId)
      .collection<Review>('reviews', (ref) =>
        ref.orderBy('dateCreated', 'desc')
      )
      .valueChanges();
  }

  addReview(review: Review, user: User) {
    return new Promise((resolve, reject) => {
      review.id = this.getNewId();
      review.dateCreated = firebase.firestore.FieldValue.serverTimestamp();

      var addReviewBatch = firebase.firestore().batch();

      // Add review to list of reviews for user
      var reviewDocRef = this.afs
        .collection<User>('users')
        .doc(user.id)
        .collection<Review>('reviews')
        .doc(review.id).ref;

      addReviewBatch.set(reviewDocRef, review);

      // Add review mapping to user for when user is updated
      var reviewMapping = <ReviewMapping>{
        id: this.getNewId(),
        userId: user.id,
        reviewId: review.id,
      };

      var reviewMappingDocRef = this.afs
        .collection('users')
        .doc(review.user.id)
        .collection('reviewsMapping')
        .doc(reviewMapping.id).ref;

      addReviewBatch.set(reviewMappingDocRef, reviewMapping);

      addReviewBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  getOffer(user: User, post: Post) {
    return new Promise((resolve, reject) => {
      this.afs
        .collection<User>('users')
        .doc(user.id)
        .collection<OfferSent>('offersSent')
        .doc(post.id)
        .valueChanges()
        .subscribe(
          (offerSent: OfferSent) => {
            resolve(offerSent ? offerSent.offer : undefined);
          },
          (error) => {
            console.error(error);
            reject();
          }
        );
    });
  }

  addOffer(post: Post, user: User, offer: Offer) {
    return new Promise((resolve, reject) => {
      offer.id = this.getNewId();
      offer.dateCreated = firebase.firestore.FieldValue.serverTimestamp();

      var addOfferBatch = firebase.firestore().batch();

      // Add offer to list of offers in user's post
      var userPostOfferDocRef = this.afs
        .collection<User>('users')
        .doc(post.user.id)
        .collection<Post>('posts')
        .doc(post.id)
        .collection<Offer>('offers')
        .doc(offer.id).ref;

      addOfferBatch.set(userPostOfferDocRef, offer);

      // Set last offer in post
      var postLastOfferRefDoc = this.afs
        .collection<User>('users')
        .doc(post.user.id)
        .collection<Post>('posts')
        .doc(post.id).ref;

      addOfferBatch.update(postLastOfferRefDoc, {
        lastOffer: <Offer>{
          value: offer.value,
          dateCreated: offer.dateCreated,
        },
      });

      // Add offer mapping to user for when user is updated
      var offerMapping = <OfferMapping>{
        id: this.getNewId(),
        userId: post.user.id,
        postId: post.id,
        offerId: offer.id,
      };

      var offersMappingDocRef = this.afs
        .collection('users')
        .doc(user.id)
        .collection('offersMapping')
        .doc(offerMapping.id).ref;

      addOfferBatch.set(offersMappingDocRef, offerMapping);

      // Add offer to list of received offers in user
      var offerSent = <OfferSent>{
        postTitle: post.title,
        postPictureURL: post.pictureURLs[0],
        offer: offer,
      };

      var offerSentDocRef = this.afs
        .collection<User>('users')
        .doc(user.id)
        .collection<Offer>('offersSent')
        .doc(post.id).ref;

      addOfferBatch.set(offerSentDocRef, offerSent);

      addOfferBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  updateOffer(post: Post, user: User, offer: Offer) {
    return new Promise((resolve, reject) => {
      offer.dateCreated = firebase.firestore.FieldValue.serverTimestamp();

      var updateOfferBatch = firebase.firestore().batch();

      // Add offer to list of offers in user's post
      var userPostOfferDocRef = this.afs
        .collection<User>('users')
        .doc(post.user.id)
        .collection<Post>('posts')
        .doc(post.id)
        .collection<Offer>('offers')
        .doc(offer.id).ref;

      updateOfferBatch.update(userPostOfferDocRef, offer);

      // Set last offer in post
      var postLastOfferRefDoc = this.afs
        .collection<User>('users')
        .doc(post.user.id)
        .collection<Post>('posts')
        .doc(post.id).ref;

      updateOfferBatch.update(postLastOfferRefDoc, {
        lastOffer: <Offer>{
          value: offer.value,
          dateCreated: offer.dateCreated,
        },
      });

      // Add offer to list of received offers in user
      var offerSent = <OfferSent>{
        postTitle: post.title,
        postPictureURL: post.pictureURLs[0],
        offer: offer,
      };

      var offerSentDocRef = this.afs
        .collection<User>('users')
        .doc(user.id)
        .collection<Offer>('offersSent')
        .doc(post.id).ref;

      updateOfferBatch.update(offerSentDocRef, offerSent);

      updateOfferBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  deleteOffer(post: Post, user: User, offer: Offer) {
    return new Promise((resolve, reject) => {
      var deleteOfferBatch = firebase.firestore().batch();

      // Add offer to list of offers in user's post
      var userPostOfferDocRef = this.afs
        .collection<User>('users')
        .doc(post.user.id)
        .collection<Post>('posts')
        .doc(post.id)
        .collection<Offer>('offers')
        .doc(offer.id).ref;

      deleteOfferBatch.delete(userPostOfferDocRef);

      // Remove last offer in post
      var postLastOfferRefDoc = this.afs
        .collection<User>('users')
        .doc(post.user.id)
        .collection<Post>('posts')
        .doc(post.id).ref;

      deleteOfferBatch.update(postLastOfferRefDoc, {
        lastOffer: firebase.firestore.FieldValue.delete(),
      });

      // Add offer to list of received offers in user
      var offerSentDocRef = this.afs
        .collection<User>('users')
        .doc(user.id)
        .collection<Offer>('offersSent')
        .doc(post.id).ref;

      deleteOfferBatch.delete(offerSentDocRef);

      deleteOfferBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  getUserPostsWithOffers(userId: string) {
    return new Promise((resolve, reject) => {
      return this.afs
        .collection<UserDetails>('users')
        .doc(userId)
        .collection<Post>('posts')
        .valueChanges()
        .subscribe(
          (posts) => {
            var postsWithOffers = [];

            posts.forEach((post) => {
              if (post.lastOffer) {
                postsWithOffers.push(post);
              }
            });

            resolve(postsWithOffers);
          },
          (error) => {
            console.error(error);
            reject();
          }
        );
    });
  }

  getOffers(user: User, post: Post): Observable<Offer[]> {
    return this.afs
      .collection<User>('users')
      .doc(user.id)
      .collection<Post>('posts')
      .doc(post.id)
      .collection<Offer>('offers')
      .valueChanges();
  }

  getOffersSent(user: User): Observable<OfferSent[]> {
    return this.afs
      .collection<User>('users')
      .doc(user.id)
      .collection<OfferSent>('offersSent')
      .valueChanges();
  }

  getBusinessDiscussion(
    userId: string,
    discussionId: string
  ): Observable<Discussion> {
    return this.afs
      .collection<User>('users')
      .doc(userId)
      .collection<Discussion>('discussions')
      .doc<Discussion>(discussionId)
      .valueChanges();
  }

  setDiscussionAsRead(userId: string, discussionId: string) {
    return new Promise((resolve, reject) => {
      this.afs
        .collection<User>('users')
        .doc(userId)
        .collection<Discussion>('discussions')
        .doc<Discussion>(discussionId)
        .update({
          read: true,
        })
        .then(
          () => {
            resolve();
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        );
    });
  }

  businessDiscussionExists(user: User, post: Post) {
    return new Promise((resolve, reject) => {
      this.afs
        .collection<Post>('posts')
        .doc(post.id)
        .collection<Discussion>('discussions')
        .doc(user.id)
        .valueChanges()
        .subscribe(
          (discussion: Discussion) => {
            resolve(discussion);
          },
          (error) => {
            console.error(error);
            reject();
          }
        );
    });
  }

  getBusinessDiscussions(user: User): Observable<Discussion[]> {
    return this.afs
      .collection<User>('users')
      .doc(user.id)
      .collection<Discussion>('discussions')
      .valueChanges();
  }

  getUnreadDiscussions(userId: string): Observable<Discussion[]> {
    return this.afs
      .collection<User>('users')
      .doc(userId)
      .collection<Discussion>('discussions', (ref) =>
        ref.where('read', '==', false)
      )
      .valueChanges();
  }

  addBusinessDiscussion(user: User, post: Post, discussion: Discussion) {
    return new Promise((resolve, reject) => {
      discussion.id = this.getNewId();
      discussion.lastMessage.dateCreated = firebase.firestore.FieldValue.serverTimestamp();

      var addDiscussionBatch = firebase.firestore().batch();

      // Add discussion to list of discussions in post
      var postDiscussionDocRef = this.afs
        .collection<Post>('posts')
        .doc(post.id)
        .collection<Discussion>('discussions')
        .doc(user.id).ref;

      addDiscussionBatch.set(postDiscussionDocRef, discussion);

      // Add discussion to list of discussions in user 1
      var user1DiscussionDocRef = this.afs
        .collection<User>('users')
        .doc(discussion.user1.id)
        .collection<Discussion>('discussions')
        .doc(discussion.id).ref;

      addDiscussionBatch.set(user1DiscussionDocRef, discussion);

      // Add discussion to list of discussions in user 2
      var user2DiscussionDocRef = this.afs
        .collection<User>('users')
        .doc(discussion.user2.id)
        .collection<Discussion>('discussions')
        .doc(discussion.id).ref;

      addDiscussionBatch.set(user2DiscussionDocRef, discussion);

      // Add discussion to list of discussions
      var discussionDocRef = this.afs
        .collection<Discussion>('discussions')
        .doc(discussion.id).ref;

      addDiscussionBatch.set(discussionDocRef, discussion);

      addDiscussionBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  getMessages(discussionId: string): Observable<Message[]> {
    return this.afs
      .collection<Discussion>('discussions')
      .doc(discussionId)
      .collection<Message>('messages', (ref) =>
        ref.orderBy('dateCreated', 'asc')
      )
      .valueChanges();
  }

  sendMessage(discussion: Discussion, message: Message) {
    return new Promise((resolve, reject) => {
      message.id = this.getNewId();
      message.dateCreated = firebase.firestore.FieldValue.serverTimestamp();

      var addMessageBatch = firebase.firestore().batch();

      // Add message to list of messages in discussion
      var messageDocRef = this.afs
        .collection<Discussion>('discussions')
        .doc(discussion.id)
        .collection<Message>('messages')
        .doc(message.id).ref;

      addMessageBatch.set(messageDocRef, message);

      // Add discussion to list of discussions in user 1
      var user1DiscussionDocRef = this.afs
        .collection<User>('users')
        .doc(discussion.user1.id)
        .collection<Discussion>('discussions')
        .doc(discussion.id).ref;

      addMessageBatch.update(user1DiscussionDocRef, {
        lastMessage: message,
        read: false,
      });

      // Add discussion to list of discussions in user 2
      var user2DiscussionDocRef = this.afs
        .collection<User>('users')
        .doc(discussion.user2.id)
        .collection<Discussion>('discussions')
        .doc(discussion.id).ref;

      addMessageBatch.update(user2DiscussionDocRef, {
        lastMessage: message,
        read: false,
      });

      // Add message to list of messages in discussion
      var discussionDocRef = this.afs
        .collection<Discussion>('discussions')
        .doc(discussion.id).ref;

      addMessageBatch.update(discussionDocRef, {
        lastMessage: message,
        read: false,
      });

      addMessageBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  getUnreadNotifications(userId: string) {
    return this.afs
      .collection('users')
      .doc(userId)
      .collection('notifications', (ref) => ref.where('read', '==', false))
      .valueChanges();
  }

  getUnreadNotificationsOnce(userId: string) {
    return new Promise((resolve, reject) => {
      return this.afs
        .collection('users')
        .doc(userId)
        .collection('notifications', (ref) => ref.where('read', '==', false))
        .snapshotChanges()
        .pipe(first())
        .subscribe(
          (querySnapshot) => {
            var unreadNotifications = [];

            querySnapshot.forEach((doc) => {
              var notification = doc.payload.doc.data();
              notification.id = doc.payload.doc.id;

              unreadNotifications.push(notification);
            });

            resolve(unreadNotifications);
          },
          (error) => {
            console.error(error);
            reject();
          }
        );
    });
  }

  getNotifications(userId: string) {
    return this.afs
      .collection('users')
      .doc(userId)
      .collection('notifications', (ref) => ref.orderBy('dateCreated', 'desc'))
      .valueChanges();
  }

  markNotificationsAsRead(userId: string, unreadNotifications: Notification[]) {
    return new Promise((resolve, reject) => {
      var markNotificationsAsReadBatch = firebase.firestore().batch();

      unreadNotifications.forEach((notification) => {
        var unreadNotificationRef = this.afs
          .collection('users')
          .doc(userId)
          .collection('notifications')
          .doc(notification.id).ref;

        markNotificationsAsReadBatch.update(unreadNotificationRef, {
          read: true,
        });
      });

      markNotificationsAsReadBatch.commit().then(
        () => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }
}
