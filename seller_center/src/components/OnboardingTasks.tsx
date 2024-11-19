import React from "react";

interface StepItemProps {
  step: string;
  label: string;
  completed: boolean;
  active: boolean;
}

const StepItem: React.FC<StepItemProps> = ({
  step,
  label,
  completed,
  active,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          completed
            ? "bg-blue-500"
            : active
              ? "bg-white text-blue-500 border-2 border-blue-500"
              : "bg-gray-200"
        }`}
      >
        {completed ? <i className="text-white">✓</i> : <span>{step}</span>}
      </div>
      <span
        className={`mt-2 text-sm ${active ? "text-white" : "text-gray-400"}`}
      >
        {label}
      </span>
    </div>
  );
};

const OnboardingTasks: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg">
      {/* Header */}
      <h1 className="text-lg font-semibold mb-4 text-center">
        Chào mừng bạn đến với Lazada! Kênh thương mại điện tử hàng đầu Việt Nam
      </h1>

      {/* Steps */}
      <div className="flex justify-around w-full max-w-md mb-6">
        <StepItem step="1" label="Hộp thư" completed={true} active={false} />
        <StepItem step="2" label="Địa chỉ" completed={false} active={true} />
        <StepItem
          step="3"
          label="Thông Tin Chủ Gian Hàng"
          completed={false}
          active={false}
        />
        <StepItem step="4" label="Sản phẩm" completed={false} active={false} />
      </div>

      {/* Content */}
      <div className="bg-white text-gray-800 rounded-lg p-6 text-center shadow-lg">
        <img
          className="mx-auto mb-4 w-24 h-24"
          src="https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01PfGr5N28R4jX036WL_!!6000000007928-55-tps-184-184.svg"
          alt="Onboarding Illustration"
        />
        <p className="mb-2">
          Hoàn thành sổ địa chỉ ngay để Lazada thiết lập đơn vị vận chuyển cho
          bạn
        </p>
        <p className="text-gray-500 text-sm mb-6">không có video</p>

        {/* Button */}
        <a
          href="/apps/todo/detail/address?sellerType=1"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Thêm
        </a>

        {/* Footer Description */}
        <p className="text-gray-500 text-xs mt-4">
          Vui lòng thêm địa chỉ để tối ưu hóa phí vận chuyển
        </p>
      </div>
    </div>
  );
};

export default OnboardingTasks;
