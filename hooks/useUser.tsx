import { createContext, useContext, useEffect, useState } from "react";

import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { User } from "@supabase/auth-helpers-nextjs";

import { Subscription, UserDetails } from "@/types";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext(); // useSessionContext is from @supabase/auth-helpers-react and we use it to get the session and the supabaseClient from the context and we are destructuring the session and the isLoading from the returned object from the useSessionContext hook

  const user = useSupaUser(); // useUser is from @supabase/auth-helpers-nextjs and we use it to get the user from the context

  const accessToken = session?.access_token ?? null; // getting the access token from the session object and if it is null we are setting it to null
  const [isLoadingData, setIsloadingData] = useState(false); // using this state to check if we are loading the data from the database or not
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null); // using this state to store the user details in the database and set the user details in the state object to null by default
  const [subscription, setSubscription] = useState<Subscription | null>(null); // using this state to store the subscription details in the database and set the subscription details in the state object to null by default

  const getUserDetails = () => supabase.from("users").select("*").single(); // using this function to get the user details from the database and we are using the single method to get only one user
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single(); // using this function to get the subscription details from the database and we are using the single method to get only one subscription

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0]; // getting the user details from the results array
          const subscriptionPromise = results[1]; // getting the subscription details from the results array

          if (userDetailsPromise.status === "fulfilled")
            setUserDetails(userDetailsPromise.value.data as UserDetails); // setting the user details in the state object

          if (subscriptionPromise.status === "fulfilled")
            setSubscription(subscriptionPromise.value.data as Subscription); // setting the subscription details in the state object

          setIsloadingData(false);
        }
      ); // we are using the Promise.allSettled method to get the user details and the subscription details from the database and we are using the then method to get the results from the Promise.allSettled method and we are using the Promise.allSettled method to get the user details and the subscription details from the database and we are using the then method to get the results from the Promise.allSettled method and we are using the Promise.allSettled method to get the user details and the subscription details from the database and we are using the then method to get the results from the Promise.allSettled method
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]); 
  // }, [user, isLoadingUser, isLoadingData, userDetails, subscription, getUserDetails, getSubscription]); 
  // here ignore warning or else we will get the user details and the subscription details from the database every time the user details or the subscription details change are changed

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  }; // this object to store the accessToken, user, userDetails, isLoading, and subscription and we are using the isLoadingUser and the isLoadingData to check if we are loading the data from the database or not

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
