"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthRoutes = ({ children }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    router.refresh();
    setIsLoading(false);
  }, [router]);
  return isLoading ? "Loading, please wait..." : children;
};

export default AuthRoutes;
