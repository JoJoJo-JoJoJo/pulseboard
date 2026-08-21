"use client";

import { getUpdateById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { auth } = useAuth();
  const [update, setUpdate] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let ignore = false;
    getUpdateById(id, auth?.token)
      .then((data) => {
        if (!ignore) {
          setUpdate(data.update);
        }
      })
      .catch((error) => {
        if (!ignore) {
          setError(error.message);
        }
      });

    return () => {
      ignore = true;
    };
  }, [id, auth?.token]);

  function handleHomeClick() {
    router.push("/");
  }

  if (error) {
    return <div>Error Loading Page</div>;
  }
  if (!update) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <span>{update._id}</span>{" "}
      <button type="button" onClick={() => handleHomeClick()}>
        All Updates
      </button>
    </div>
  );
}
