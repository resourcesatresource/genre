import React, { useEffect } from "react";

import Button from "../../../ui/button";
import { usePost } from "../../../hooks/use-https";
import { POST_ADMIN_REQUEST } from "../../../constants/api-endpoints";

const AdminRequest: React.FC<{
  onError?: (error: string) => void;
  onSuccess?: (message: string) => void;
}> = ({ onError, onSuccess }) => {
  const { execute, error, success, loading } = usePost(POST_ADMIN_REQUEST, {
    lazy: true,
  });

  useEffect(() => {
    if (error) {
      onError?.(error);
    }

    if (!error && success) {
      onSuccess?.(
        "Your request for admin access has been successfully submitted."
      );
    }
  }, [error, success]);

  const handleRequest = () => {
    onSuccess?.("");
    onError?.("");
    execute();
  };

  return (
    <Button
      icon="user-tie"
      onClick={handleRequest}
      isLoading={loading}
      disabled={loading}
    >
      Request for admin access
    </Button>
  );
};

export default AdminRequest;
