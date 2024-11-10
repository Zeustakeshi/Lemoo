const ProfileCard = () => {
  return (
    <div
      className="profile-card-wrapper flex flex-col bg-white p-4 rounded-lg shadow-lg"
      style={{ gridArea: "sellerProfile" }}
    >
      <div className="profile-card-content flex items-center">
        <a
          href="/site/profile/infoSettings"
          target="_blank"
          className="profile-avatar"
          data-spm="d_profile_v1"
        >
          <div className="image-card">
            <img
              className="w-24 h-24 rounded-full"
              src="https://img.lazcdn.com/g/tps/tfs/TB1fY1VF.z1gK0jSZLeXXb9kVXa-96-96.png_2200x2200q80.png_.webp"
              alt="Avatar"
            />
          </div>
        </a>
        <div className="profile-info ml-4">
          <a
            href="/site/profile/infoSettings"
            data-spm="d_title_v1"
            target="_blank"
            className="profile-name text-lg font-semibold text-gray-800"
            title="sD9sSYrs"
          >
            sD9sSYrs
          </a>
          <div className="profile-level-rank flex items-center mt-2">
            <span className="level text-sm text-gray-600">Level 1</span>
            <span className="rank ml-4 text-sm text-gray-600">Rank 0</span>
            <a
              href="/sponsor/solutions/ads/productads/"
              target="_blank"
              className="flex items-center ml-4 text-blue-500"
              data-spm="d_voucher_tip"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 1228 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="currentColor">
                  <path d="M0 1024l362.2912-308.9408 232.448 195.584 82.432 69.7344 81.408-97.8944 367.616-442.368L1228.8 507.0848V0L779.776 214.7328l93.696 75.9808-238.7968 357.6832-222.1056-146.944-82.3296-54.3744-49.9712 75.9808L0 1024z" />
                </g>
              </svg>
              <span className="ml-1">Đẩy Truy Cập và Doanh Thu</span>
              <i className="next-icon next-icon-arrow-right next-xs ml-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
