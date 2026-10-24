"use client";

import {
  ConfigProvider,
  Input,
  Table,
  Tag,
  Avatar,
  Select,
  DatePicker,
  Button,
} from "antd";
import { Search, Eye, UserX, Download } from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import EarningModal from "./EarningModal";
import { useGetTransactionsQuery } from "@/redux/api/transactionApi";

const { RangePicker } = DatePicker;

export default function EarningsTable() {
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState(undefined);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const startDate = dateRange?.[0]?.format("YYYY-MM-DD");
  const endDate = dateRange?.[1]?.format("YYYY-MM-DD");

  const { data, isLoading } = useGetTransactionsQuery({
    limit: 10,
    page: currentPage,
    searchText: searchText || undefined,
    status: status || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  // ===== Stats from API =====
  const grossBookingValue = data?.data?.grossBookingValue || 0;
  const platformTotalDeduction = data?.data?.platformTotalDeduction || 0;
  const expertPayout = data?.data?.expertPayout || 0;

  // ===== Table Data Mapping =====
  const tableData =
    data?.data?.paymentList?.map((item) => ({
      key: item._id,
      _id: item._id,
      fullData: item,
      id: item.id,
      name: `${item.consultee?.firstName || ""} ${item.consultee?.lastName || ""}`.trim(),
      image: item.consultee?.photoUrl,
      expertname:
        `${item.expert?.firstName || ""} ${item.expert?.lastName || ""}`.trim(),
      expertimage: item.expert?.photoUrl,
      expertemail: item.expert?.email,
      useremail: item.consultee?.email,
      amount: item.amount || item.consultationFee || 0,
      expertPayout: item.expertPayout || item.consultAmount || 0,
      platformFee: item.platformTotalDeduction || item.platformTotal || 0,
      sessionType: item.booking?.sessionType || "-",
      duration: item.booking?.sessionDuration
        ? `${item.booking.sessionDuration} min`
        : "-",
      date: dayjs(item.createdAt).format("DD MMM YYYY"),
      bookingTime: item.booking?.localStartTime
        ? `${item.booking.localDate} • ${item.booking.localStartTime} - ${item.booking.localEndTime}`
        : "-",
      status: item.status,
      settlementStatus: item.settlementStatus,
      BookingId: item.booking?.id,
    })) || [];

  // ===== CSV Export =====
  const exportToCSV = () => {
    if (!tableData.length) return;

    const headers = [
      "Transaction ID",
      "User Name",
      "User Email",
      "Expert Name",
      "Expert Email",
      "Gross Amount (£)",
      "Expert Payout (£)",
      "Platform Fee (£)",
      "Session Type",
      "Duration",
      "Date",
      "Booking Time",
      "Status",
      "Settlement Status",
      "Booking ID",
    ];

    const rows = tableData.map((row) => [
      row.id ?? "",
      row.name ?? "",
      row.useremail ?? "",
      row.expertname ?? "",
      row.expertemail ?? "",
      row.amount ?? 0,
      row.expertPayout ?? 0,
      row.platformFee ?? 0,
      row.sessionType?.replace("_", " ") ?? "",
      row.duration ?? "",
      row.date ?? "",
      row.bookingTime ?? "",
      row.status ?? "",
      row.settlementStatus?.replace("_", " ") ?? "",
      row.BookingId ?? "",
    ]);

    const escapeCSV = (value) => {
      const str = String(value ?? "");
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `earnings_${dayjs().format("YYYY-MM-DD_HH-mm")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ===== Columns =====
  const columns = [
    {
      title: "User",
      width: 200,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {record.image ? (
            <Avatar src={record.image} size={44} />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
              <UserX size={20} className="text-gray-400" />
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900">{record.name}</p>
            <p className="truncate text-xs text-gray-400">{record.useremail}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Expert",
      width: 200,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {record.expertimage ? (
            <Avatar src={record.expertimage} size={44} />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
              <UserX size={20} className="text-gray-400" />
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900">
              {record.expertname}
            </p>
            <p className="truncate text-xs text-gray-400">
              {record.expertemail}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Session",
      width: 140,
      render: (_, record) => (
        <div>
          <p className="font-medium capitalize text-gray-800">
            {record.sessionType.replace("_", " ")}
          </p>
          <p className="text-xs text-gray-500">{record.duration}</p>
        </div>
      ),
    },
    {
      title: "Gross Amount",
      dataIndex: "amount",
      width: 120,
      render: (val) => (
        <Tag color="blue" className="rounded-full px-3">
          £{val}
        </Tag>
      ),
    },
    {
      title: "Expert Payout",
      dataIndex: "expertPayout",
      width: 120,
      render: (val) => (
        <Tag color="green" className="rounded-full px-3">
          £{val}
        </Tag>
      ),
    },
    {
      title: "Platform Fee",
      dataIndex: "platformFee",
      width: 110,
      render: (val) => (
        <span className="text-sm font-medium text-orange-600">£{val}</span>
      ),
    },
    {
      title: "Settlement",
      dataIndex: "settlementStatus",
      width: 100,
      render: (status) => {
        const colorMap = {
          withdrawn: "success",
          pending_session: "warning",
          pending: "default",
          cleared: "processing",
          refunded: "error",
        };
        return (
          <Tag
            color={colorMap[status] || "default"}
            className="rounded-full capitalize"
          >
            {status?.replace("_", " ")}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 150,
      render: (status) => (
        <Tag
          color={status === "refunded" ? "red" : "green"}
          className="rounded-full uppercase"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Booking Id",
      dataIndex: "BookingId",
      width: 150,
      render: (val) => <span className="text-sm text-gray-500">{val}</span>,
    },
    {
      title: "Action",
      fixed: "right" as const,
      width: 80,
      render: (_, record) => (
        <button
          onClick={() => {
            setSelectedTransaction(record.fullData);
            setShowEarningModal(true);
          }}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
        >
          <Eye size={18} />
        </button>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
        },
      }}
    >
      {/* ========== STATS CARDS ========== */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-blue-600">
            Gross Booking Value
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            £ {grossBookingValue?.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-gray-500">Total session value</p>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-orange-600">
            Platform Deduction
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            £ {platformTotalDeduction?.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-gray-500">Commission + VAT</p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-emerald-600">Expert Payout</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            £ {expertPayout?.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-gray-500">Net amount for experts</p>
        </div>
      </div>

      {/* ========== FILTERS ========== */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Select
            placeholder="Filter by Status"
            allowClear
            style={{ width: 160 }}
            value={status}
            onChange={(value) => {
              setStatus(value);
              setCurrentPage(1);
            }}
            options={[
              { value: "paid", label: "Paid" },
              { value: "refunded", label: "Refunded" },
              { value: "authorized", label: "Authorized" },
              { value: "unpaid", label: "Unpaid" },
              { value: "failed", label: "Failed" },
              { value: "cancelled", label: "Cancelled" },
              { value: "partial_refund", label: "Partial Refund" },
            ]}
            className="h-11"
          />

          <RangePicker
            className="h-11"
            format="YYYY-MM-DD"
            placeholder={["Start Date", "End Date"]}
            value={dateRange}
            onChange={(dates) => {
              setDateRange(dates);
              setCurrentPage(1);
            }}
            allowClear
          />
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Search by user name or booking ID"
              prefix={<Search size={16} className="text-gray-400" />}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
              allowClear
              className="h-11 rounded-xl"
            />
          </div>

          <Button
            type="primary"
            icon={<Download size={16} />}
            onClick={exportToCSV}
            disabled={!tableData.length || isLoading}
            className="h-11 shrink-0 rounded-xl"
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* ========== TABLE ========== */}
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
        pagination={{
          total: data?.meta?.total || 0,
          current: currentPage,
          pageSize: 10,
          onChange: (page) => setCurrentPage(page),
          showTotal: (total) => `Total ${total} transactions`,
          showSizeChanger: false,
        }}
        scroll={{ x: 1200 }}
        className="rounded-xl"
        rowClassName="hover:bg-gray-50"
      />

      {/* Modal */}
      <EarningModal
        open={showEarningModal}
        setOpen={setShowEarningModal}
        transactionID={selectedTransaction?._id}
      />
    </ConfigProvider>
  );
}
