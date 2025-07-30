import { useGet } from "../../hooks/use-https";
import { GET_USERS } from "../../constants/api-endpoints";
import PageWrapper from "../../ui/page-wrapper";
import Table from "../../ui/table";
import Card from "../../ui/card";
import ErrorWrapper from "../../components/ErrorWrapper";
import Icon from "../../ui/icon";
import { t } from "../../services/i18n";
import { constructUsersTableData } from "./utils";
import { User } from "../../types/commons";

const UsersListing = () => {
  const { loading, error, data } = useGet<User[]>(GET_USERS);

  return (
    <PageWrapper isLoading={loading}>
      <ErrorWrapper error={error}>
        <Card padding="lg">
          <div className="d-flex">
            <Icon name="list" size={36} marginRight="xs"></Icon>
            <h2>{t("users_listing.title")}</h2>
          </div>
          <Table
            listingLabel="#"
            emptyStateTitle={t("users_listing.empty_state.title")}
            data={constructUsersTableData(data ?? [])}
          />
        </Card>
      </ErrorWrapper>
    </PageWrapper>
  );
};

export default UsersListing;
