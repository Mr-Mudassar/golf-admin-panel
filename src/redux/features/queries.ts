import { gql } from "@apollo/client";

export const GET_POSTS_BY_CIRCLE = gql`
  query GetPostsByCircle($page: Float!) {
    getPostByCricle(page: $page) {
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
