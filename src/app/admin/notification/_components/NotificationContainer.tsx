"use client";
import { getApiErrorMessage } from "@/utils/customMessage";

import NotificationCard from "./NotificationCard";
import { Button, Empty } from "antd";
import {
  useDeleteNotificationMutation,
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
} from "@/redux/api/notificationApi";
import toast from "react-hot-toast";
import { useState } from "react";

export default function NotificationContainer() {
  const [currentPage, setCurrentPage] = useState(1);

  const query = {
    page: currentPage,
    limit: 10,
  };

  const {
    data: notificationRes,
    isLoading: notificationLoading,
    isFetching,
    refetch,
  } = useGetMyNotificationQuery(query, {
    pollingInterval: 2000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const notificationData = notificationRes?.data || [];
  const [updateNotification, { isLoading: updateLoading }] =
    useMarkAsReadMutation();
  const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

  const handelToRead = async () => {
    try {
      await updateNotification({}).unwrap();
      toast.success("All Notification successfully mark as read");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Request failed"));
    }
  };
  const handelDelete = async () => {
    try {
      await deleteNotification({}).unwrap();
      toast.success("All Notification Deleted successfully");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Request failed"));
    }
  };

  return (
    <div className="mx-auto mb-10 w-3/4">
      <section className="flex-center-between mb-10">
        {notificationData?.length > 0 && (
          <div className="space-x-3">
            <Button
              onClick={handelToRead}
              loading={updateLoading}
              type="primary"
            >
              Mark as read
            </Button>
            <Button
              loading={isLoading}
              onClick={handelDelete}
              className="!bg-danger !text-white"
            >
              Delete all
            </Button>
          </div>
        )}
      </section>
      <section className="space-y-8">
        {notificationData?.length > 0 ? (
          notificationData?.map((notification) => (
            <NotificationCard
              key={notification.key}
              notification={notification}
            />
          ))
        ) : (
          <Empty description="No notification found" />
        )}
      </section>
    </div>
  );
}
