"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (data && data.user) {
    if (data.user.identities && data.user.identities.length > 0) {
      console.log("Sign-up successful!");
    } else {
      return encodedRedirect(
        "error",
        "/sign-up",
        "Email address is already taken",
      );
    }
  }

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/userPage");
};

export const signInGoogle = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.LOCAL_URL}auth/callback`,
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  if (data.url) {
    redirect(data.url)
  }
};


export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/userPage/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/userPage/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/userPage/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/userPage/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/userPage", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export async function getUserProfiles() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('No user is logged in or error occurred:', userError);
    return null;
  }

  const { data, error } = await supabase.from('user_profiles').select('*').eq('user_id', user.id).single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

export async function updateUsername(newUsername: string) {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('No user is logged in or error occurred:', userError);
    return null;
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .update({ username: newUsername })
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error updating username:', error);
    return null;
  }

  return data;
}

export async function updateBirthday(newBirthday: string) {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('No user is logged in or error occurred:', userError);
    return null;
  }

  if (!newBirthday || isNaN(new Date(newBirthday).getTime())) {
    console.error('Invalid date format:', newBirthday);
    return null;
  }

  const { data, error } = await supabase
    .from('user_profiles')
    .update({ date_of_birth: newBirthday })
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error updating date of birth:', error);
    return null;
  }

  return data;
}

export async function getUsersProfiles() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('No user is logged in or error occurred:', userError);
    return null;
  }

  const { data, error } = await supabase.from('user_profiles').select('*');

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  const filteredProfiles = data?.filter(profile => profile.user_id !== user.id);

  return filteredProfiles;
}

export async function sendFriendRequest(receiverId: string) {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('No user is logged in or error occurred:', userError);
    return null;
  }

  const senderId = user.id;

  const { data, error } = await supabase
    .from('friend_requests')
    .insert([{ sender_id: senderId, receiver_id: receiverId, status: 'pending' }])
    .select('*');

  if (error) {
    console.error('Error sending friend request:', error);
    return null;
  }

  const { data: senderProfile, error: senderError } = await supabase
    .from('user_profiles')
    .select('sent_friend_requests')
    .eq('user_id', senderId)
    .single();

  if (senderError) {
    console.error('Error fetching sender profile:', senderError);
    return null;
  }

  const updatedSentRequests = [...(senderProfile?.sent_friend_requests || []), {
    sender_id: senderId,
    receiver_id: receiverId,
    status: 'pending'
  }];

  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({ sent_friend_requests: updatedSentRequests })
    .eq('user_id', senderId);

  if (updateError) {
    console.error('Error updating sent_friend_requests:', updateError);
    return null;
  }

  const { data: receiverProfile, error: receiverError } = await supabase
    .from('user_profiles')
    .select('received_friend_requests')
    .eq('user_id', receiverId)
    .single();

  if (receiverError) {
    console.error('Error fetching receiver profile:', receiverError);
    return null;
  }

  const updatedReceivedRequests = [...(receiverProfile?.received_friend_requests || []), {
    sender_id: senderId,
    receiver_id: receiverId,
    status: 'pending'
  }];

  const { error: receiverUpdateError } = await supabase
    .from('user_profiles')
    .update({ received_friend_requests: updatedReceivedRequests })
    .eq('user_id', receiverId);

  if (receiverUpdateError) {
    console.error('Error updating received_friend_requests:', receiverUpdateError);
    return null;
  }

  return data;
}
