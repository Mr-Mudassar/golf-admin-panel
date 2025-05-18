import { gql } from "@apollo/client";

export const GET_ALL_USER_POST = gql`
  query GetAllUserPost($page: Float!) {
    getAllUserPost(page: $page) {
      userInfo {
        type
        city
        state
        userid
        country
        last_name
        fcm_token
        first_name
        photo_profile
      }
      type
      title
      postid
      created
      geohash
      has_media
      user_tags
      group_tags
      postal_code
      description
      comment_count
    }
  }
`;

//  values {
//       userInfo {
//         type
//         city
//         state
//         userid
//         country
//         last_name
//         fcm_token
//         first_name
//         photo_profile
//       }
//       type
//       title
//       postid
//       created
//       geohash
//       has_media
//       user_tags
//       group_tags
//       like_Count
//       share_Count
//       postal_code
//       description
//       comment_count
//     }

export const GET_POST_MEDIA_BY_POSTID = gql`
  query getPostMediaById($postId: String!) {
    getPostMediaByPostId(postId: $postId) {
      url
      json
      type
      post_id
      file_id
      created
      modified
      mime_type
      postmediaid
      thumbnail_url
      thumbnail_file_id
    }
  }
`;

export const DELTE_USER_POST = gql`
  mutation DeleteUserPost($user_id: String!, $created: String!) {
    deleteUserPost(user_id: $user_id, created: $created)
  }
`;

export const GET_ALL_USER = gql`
  query getAllUsers($page: Float!) {
    getAllUsers(page: $page) {
      userid
      first_name
      last_name
      email
      photo_profile
      city
      state
      country
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUser($userId: String, $email: String) {
    getUser(userId: $userId, email: $email) {
      first_name
      last_name
      email
      created
      userid
      postalcode
      address
      bio
      city
      country
      photo_profile
      type
      photo_cover
      state
      phone
      status
      hobbies
      gender
      has_profile_completed
    }
  }
`;

export const GET_ALL_POST_OF_SINGLE_USER = gql`
  query getAllPostOfSingleUser($userId: String!, $page: Float!) {
    getPostsByUserId(userId: $userId, page: $page) {
      values {
        userInfo {
          type
          city
          state
          userid
          country
          last_name
          fcm_token
          first_name
          photo_profile
        }
        type
        title
        postid
        created
        geohash
        has_media
        user_tags
        group_tags
        like_Count
        share_Count
        postal_code
        description
        comment_count
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($type: String!) {
    deleteUser(type: $type)
  }
`;

export const GET_USER_FRIEND_LIST = gql`
  query GetUserFriendList($pageState: Float!) {
    getUserFriendList(pageState: $pageState) {
      values {
        user_id
        created
        friend_user_id
        room_id
      }
    }
  }
`;
//  userInfo {
//           userid
//           first_name
//           last_name
//           fcm_token
//           photo_profile
//           type
//           city
//           state
//           country
//         }

export const GET_COMMENT_BY_POST = gql`
  query GetCommentByPost($postId: String!, $page: Float!) {
    getCommentByPost(postId: $postId, page: $page) {
      type
      likes
      status
      comment
      post_id
      created
      modified
      comment_id
      reply_count
      userInfo {
        userid
        last_name
        first_name
        photo_profile
      }
    }
  }
`;
