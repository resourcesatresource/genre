import { useEffect } from "react";

import { usePost, useGet } from "../../hooks/use-https";
import {
  GET_ADMIN_LIST,
  GET_ADMIN_REQUESTS,
  POST_ADMIN_REQUEST,
  POST_ADMIN_REQUEST_APPROVAL,
} from "../../constants/api-endpoints";
import { ModerationActions, TableField } from "./types";
import PageWrapper from "../../ui/page-wrapper";
import Table from "../../ui/table";
import { constructAdminsTableData, constructRequestersList } from "./utils";
import Card from "../../ui/card";
import ErrorWrapper from "../../components/ErrorWrapper";
import Icon from "../../ui/icon";
import { t } from "../../services/i18n";

const ModerationApproval = () => {
  const {
    loading: isRequesterListLoading,
    error: requesterListError,
    data: requesterList,
    execute: getRequesterList,
  } = useGet(GET_ADMIN_REQUESTS);

  const {
    loading: isAdminListLoading,
    error: adminListError,
    data: adminList,
    execute: getAdminList,
  } = useGet(GET_ADMIN_LIST);

  const {
    execute,
    error: requestActionError,
    success,
  } = usePost(POST_ADMIN_REQUEST, {
    lazy: true,
  });

  const handleModeratorActions = (
    requesterId: string,
    action: ModerationActions
  ) => {
    execute(
      POST_ADMIN_REQUEST_APPROVAL.replace(":id", requesterId).replace(
        ":action",
        action
      )
    );
  };

  const handleValueClick = (key: number, values: string[]) => {
    if (key === TableField.Action) {
      handleModeratorActions(
        values[TableField.Email],
        values[TableField.Action] as ModerationActions
      );
    }
  };

  useEffect(() => {
    if (!requestActionError && success) {
      getRequesterList();
      getAdminList();
    }
  }, [requestActionError, success]);

  return (
    <PageWrapper isLoading={isAdminListLoading || isRequesterListLoading}>
      {/* Admin List */}
      <ErrorWrapper error={requesterListError}>
        <Card padding="lg">
          <div className="d-flex">
            <Icon name="user-check" size={36} marginRight="xs"></Icon>
            <h2>{t("moderation_management.cards.admin_list.title")}</h2>
          </div>
          <Table
            listingLabel="#"
            emptyStateTitle={t(
              "moderation_management.cards.admin_list.empty_state.title"
            )}
            data={constructAdminsTableData(adminList)}
            onValueClick={handleValueClick}
          />
        </Card>
      </ErrorWrapper>

      {/* Requester List */}
      <ErrorWrapper error={adminListError}>
        {!adminListError && (
          <Card padding="lg" marginBottom="xl">
            <div className="d-flex">
              <Icon name="user-clock" size={36} marginRight="xs"></Icon>
              <h2>{t("moderation_management.cards.requester_list.title")}</h2>
            </div>
            <Table
              listingLabel="#"
              emptyStateTitle={t(
                "moderation_management.cards.requester_list.empty_state.title"
              )}
              data={constructRequestersList(requesterList)}
              onValueClick={handleValueClick}
            />
          </Card>
        )}
      </ErrorWrapper>
    </PageWrapper>
  );
};

export default ModerationApproval;
