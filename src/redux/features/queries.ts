import { gql } from "@apollo/client";

export const GET_ALL_USER_POST = gql`
  query GetAllUserPost($page: Float!) {
    getAllUserPost(page: $page) {
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

export const DELETE_POST = gql`
  mutation DeletePost(
    $type: String!
    $postid: String!
    $geohash: String!
    $userTags: [String!]
    $postCreated: String!
    $groupTags: [String!]
  ) {
    deletePost(
      type: $type
      postid: $postid
      geohash: $geohash
      userTags: $userTags
      groupTags: $groupTags
      postCreated: $postCreated
    )
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
