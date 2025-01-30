const AnnouncementCard = () => {
  return (
    <div
      className="announcement-card-wrapper flex flex-col bg-white p-4 rounded-lg shadow-lg"
      style={{ gridArea: "announcementPanel" }}
    >
      <div className="announcement-card-content">
        <div className="card-header flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Thông báo quan trọng
          </h2>
          <button
            data-spm="d_more"
            type="button"
            className="text-blue-500 flex items-center"
          >
            <span className="text-sm">Thêm</span>
            <i className="next-icon next-icon-right ml-1"></i>
          </button>
        </div>
        <div className="card-body flex items-center mt-4">
          <div className="empty-icon">
            <img
              className="w-24 h-24"
              src="https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01Ea6ZuS1WFfS0vMEQg_!!6000000002759-55-tps-118-118.svg"
              alt="No notifications"
            />
          </div>
          <div className="empty-message text-gray-600 ml-4">
            Bạn đã được cập nhật! Không có thông báo quan trọng mới cho bạn.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
