import {
  CREATE_MEDIA,
  UPDATE_USER_PROFILE,
} from "../../../redux/features/queries";
import { useState } from "react";
import toast from "react-hot-toast";
import { Form, Formik } from "formik";
import CustomBtn from "../../customBtn";
import { FiSend } from "react-icons/fi";
import { useMutation } from "@apollo/client";
import CustomInputField from "../../customInputField";
import { ReturnError } from "../../../utils/functions";
import { UPDATE_PROFILE_INITIAL_VALUES } from "../../../validations/initialValues";
import { UPDATE_PROFILE_VALIDATION_SCHEMA } from "../../../validations/validationSchema";

interface UpdateUserProfileFormProps {
  userProfileDetails: any;
  RefetchUserProfileDetails: () => void;
  setShowUpdateProfileModal: (text: boolean) => void;
}

const UpdateUserProfileForm: React.FC<UpdateUserProfileFormProps> = (props) => {
  const {
    userProfileDetails,
    RefetchUserProfileDetails,
    setShowUpdateProfileModal,
  } = props;

  const [coverProfileUrl, setCoverProfileUrl] = useState<string>();
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<any>();

  const [CreateMedia] = useMutation(CREATE_MEDIA);

  const [upateUserProfile, { loading: updateLoading }] =
    useMutation(UPDATE_USER_PROFILE);

  const handleUpdateProfileFunc = (values: any) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(
        ([key, v]) => v !== null && key !== "__typename"
      )
    );

    upateUserProfile({
      variables: {
        updatedData: {
          ...filteredValues,
        },
      },
      onCompleted: () => {
        toast.success("Profile Updated Successfully");
        setShowUpdateProfileModal(false);
        RefetchUserProfileDetails();
      },
      onError: () => {
        toast.error("Failed to udpate profile");
      },
    });
  };

  return (
    <div className="border-2 border-theme-primaryBorder rounded-lg p-4">
      <Formik
        initialValues={{
          ...UPDATE_PROFILE_INITIAL_VALUES,
          ...userProfileDetails.getUser[0],
        }}
        validationSchema={UPDATE_PROFILE_VALIDATION_SCHEMA}
        onSubmit={(values) => handleUpdateProfileFunc(values)}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {profilePreviewUrl && (
              <img
                alt="Preview"
                src={profilePreviewUrl}
                className="w-24 h-24 object-cover rounded-full border border-theme-primaryBorder mx-auto"
              />
            )}
            <div className="mt-1 flex flex-col justify-start content-center items-center">
              <label className="font-semibold text-theme-secondary text-start  w-full">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                className="border border-theme-primaryBorder p-1"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    CreateMedia({
                      variables: {
                        medias: [file],
                      },
                      onCompleted: (e) => {
                        const fileUrl = e?.createMedias[0]?.url;
                        setFieldValue("photo_profile", fileUrl);
                      },
                      onError: () => {
                        toast.error("Failed to upload file");
                      },
                    });
                    const imageUrl = URL.createObjectURL(file);
                    setProfilePreviewUrl(imageUrl);
                  }
                }}
              />
            </div>

            {coverProfileUrl && (
              <img
                alt="Preview"
                src={coverProfileUrl}
                className="w-full h-24 object-cover border border-theme-primaryBorder mx-auto"
              />
            )}

            <div className="mt-1 flex flex-col justify-start content-center items-center">
              <label className="font-semibold text-theme-secondary text-start  w-full">
                Cover Picture
              </label>
              <input
                type="file"
                accept="image/*"
                className="border border-theme-primaryBorder p-1"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];

                    CreateMedia({
                      variables: {
                        medias: [file],
                      },
                      onCompleted: (e) => {
                        const fileUrl = e?.createMedias[0]?.url;
                        setFieldValue("photo_cover", fileUrl);
                      },
                      onError: () => {
                        toast.error("Failed to upload file");
                      },
                    });
                    const imageUrl = URL.createObjectURL(file);
                    setCoverProfileUrl(imageUrl);
                  }
                }}
              />
            </div>
            <CustomInputField
              type="text"
              name="first_name"
              label="First Name"
              value={values.first_name}
              onBlurHandle={handleBlur}
              onChangeHandle={handleChange}
              error={ReturnError(errors, touched, "first_name")}
            />

            <CustomInputField
              type="text"
              name="last_name"
              label="Last Name"
              value={values.last_name}
              onBlurHandle={handleBlur}
              onChangeHandle={handleChange}
              error={ReturnError(errors, touched, "last_name")}
            />

            <CustomInputField
              type="text"
              name="email"
              label="Email"
              value={values.email}
              onBlurHandle={handleBlur}
              onChangeHandle={handleChange}
              error={ReturnError(errors, touched, "email")}
            />

            <CustomInputField
              type="text"
              name="phone"
              label="Phone Number"
              value={values.phone}
              onBlurHandle={handleBlur}
              onChangeHandle={handleChange}
              error={ReturnError(errors, touched, "phone")}
            />

            <CustomInputField
              type="text"
              name="country"
              label="Country"
              value={values.country}
              onBlurHandle={handleBlur}
              onChangeHandle={handleChange}
              error={ReturnError(errors, touched, "country")}
            />

            <CustomInputField
              type="text"
              name="state"
              label="State"
              value={values.state}
              onBlurHandle={handleBlur}
              onChangeHandle={handleChange}
              error={ReturnError(errors, touched, "state")}
            />

            <CustomInputField
              type="text"
              name="city"
              label="City"
              value={values.city}
              onBlurHandle={handleBlur}
              onChangeHandle={handleChange}
              error={ReturnError(errors, touched, "city")}
            />

            <CustomInputField
              type="text"
              name="address"
              label="Address"
              value={values.address}
              onBlurHandle={handleBlur}
              onChangeHandle={handleChange}
              error={ReturnError(errors, touched, "address")}
            />

            <CustomInputField
              type="text"
              name="postalcode"
              label="Postal Code"
              value={values.postalcode}
              onBlurHandle={handleBlur}
              onChangeHandle={handleChange}
              error={ReturnError(errors, touched, "postalcode")}
            />

            <CustomInputField
              type="text"
              name="status"
              label="Status"
              value={values?.status}
              onBlurHandle={handleBlur}
              onChangeHandle={handleChange}
              error={ReturnError(errors, touched, "status")}
            />

            <CustomInputField
              type="text"
              name="type"
              label="Type"
              value={values?.type}
              onBlurHandle={handleBlur}
              onChangeHandle={handleChange}
              error={ReturnError(errors, touched, "type")}
            />

            <CustomBtn
              type="submit"
              text="SUBMIT"
              isLoading={updateLoading}
              icon={<FiSend size={18} className="mr-2" />}
              className="flex justify-center w-full !h-9.5 rounded-sm mt-6"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateUserProfileForm;
