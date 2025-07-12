import { useEffect } from "react";

import PageWrapper from "../../ui/page-wrapper";
import { useDelete, useGet } from "../../hooks/use-https";
import {
  DELETE_CONNECTION,
  GET_CONNECTIONS,
} from "../../constants/api-endpoints";
import { useAuthContext } from "../../store";
import CreateModal from "./create-modal";
import Card from "../../ui/card";
import { CustomerResponse } from "./typings";
import Button from "../../ui/button";
import EmptyView from "../../ui/empty";
import { STRINGS } from "./helpers";

const Connections = () => {
  const { id } = useAuthContext();

  const {
    data: customers,
    execute: getConnections,
    loading,
  } = useGet<CustomerResponse[]>(GET_CONNECTIONS.replace(":id", id));

  const {
    execute: deleteConnection,
    error: deletionError,
    success: deletionSuccess,
  } = useDelete(DELETE_CONNECTION, {
    lazy: true,
    sendAuthToken: true,
  });

  const handleConnectionDeletion = (id: string) => {
    deleteConnection(DELETE_CONNECTION.replace(":id", id));
  };

  useEffect(() => {
    if (!deletionError && deletionSuccess) {
      getConnections();
    }
  }, [deletionError, deletionSuccess]);

  return (
    <PageWrapper isLoading={loading}>
      <CreateModal onSuccess={getConnections}></CreateModal>

      {(customers?.[0]?.connections ?? []).map((connection) => {
        return (
          <Card key={connection._id} padding="md">
            <p>{connection.name}</p>
            <p>{connection.url}</p>
            {connection?.description && <p>{connection.description}</p>}
            <Button
              mode="danger"
              size="sm"
              icon="trash"
              onClick={() => handleConnectionDeletion(connection._id)}
            >
              {STRINGS.connections.action.delete.button.label}
            </Button>
          </Card>
        );
      })}

      {(customers?.[0]?.connections ?? []).length === 0 && (
        <EmptyView
          icon="link"
          iconSize={48}
          title={STRINGS.connections.empty_state.title}
          subTitle={STRINGS.connections.empty_state.sub_title}
        ></EmptyView>
      )}
    </PageWrapper>
  );
};

export default Connections;
