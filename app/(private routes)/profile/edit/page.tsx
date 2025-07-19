"use client";
import Image from "next/image";
import css from "./page.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { changeNameMe } from "@/lib/api/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (newName: User) => changeNameMe(newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["name"] });
      router.push("/profile");
    },
  });

  const handleProfileSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as User;
    mutate(values);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar ? user.avatar : "Avatar"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleProfileSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              defaultValue={user?.username ? user?.username : "Add your name"}
              required
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isPending}
            >
              {isPending ? "Saving name..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
