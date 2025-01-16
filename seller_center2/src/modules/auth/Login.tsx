import {
  Alert,
  Box,
  Button,
  CardActions,
  TextField,
  Zoom,
  Card as MuiCard,
  Snackbar,
  Modal,
  Fade,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { useState } from "react";
import Cookies from "js-cookie";
import authorizedAxiosInstance from "../../common/auth/authorizedAxios";

/**Nếu OTP SAI THÌ SAO?? */
interface LoginForm {
  accountName: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  // const { setUser } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [open, setOpen] = useState(false); // Trạng thái để kiểm tra OTP đã được gửi
  const [otpSend, setOtpSend] = useState(false); // Trạng thái để kiểm tra OTP đã xác nhận đúng
  const [inputOTP, setInputOTP] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false); // Error alert state
  const [successAlert, setSuccessAlert] = useState(false); // Success alert state
  const [codeLogin, setCodeLogin] = useState("");

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleCloseSuccessAlert = () => {
    setSuccessAlert(false);
  };
  const handleCloseErrorAlert = () => {
    setErrorAlert(false);
  };

  const submitLogIn = async (data: LoginForm) => {
    if (!otpSend) {
      // Gọi API đăng nhập trước khi gọi API OTP
      try {
        const res = await authorizedAxiosInstance.post(`/auth/login`, data);
        // Lưu accessToken và refreshToken vào cookies
        Cookies.set("accessToken", res.data.data.accessToken.value, {
          expires: 1, // Thời gian tồn tại của token, hay Thời gian tồn tại của cookie
          secure: true, // Đảm bảo chỉ gửi cookies qua HTTPS
          sameSite: "Strict", // Chỉ cho phép cookies được gửi cùng trang nguồn. Tức là,
          // Kiểm soát cách thức cookie được gửi trong các yêu cầu cross-site. Strict ngăn không cho gửi cookie
          // trong các yêu cầu bên ngoài.
        });
        Cookies.set("refreshToken", res.data.data.refreshToken.value, {
          expires: 7, // Ví dụ: refreshToken tồn tại lâu hơn accessToken
          secure: true,
          sameSite: "Strict",
        });

        setSuccessAlert(true);
        setCodeLogin(res.data.data.code); // sau khi gọi thành công API đăng nhập thì lấy cái code;
        navigate({ to: "/" });
        // Mở cái Trường/ Modal OTP ra
        //setOpen(true);
        //setOtpSend(true); // OTP đã gửi
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
      }
    }
  };

  const handleOTP = async () => {
    // Xử lý dữ liệu sau khi nhấn nút
    try {
      const OtpRes = await authorizedAxiosInstance.post(
        `/auth/login/mfa/verify`,
        { code: codeLogin, otp: inputOTP }
      );

      console.log("res register", OtpRes.data);

      // Lưu accessToken và refreshToken vào cookies
      Cookies.set("accessToken", OtpRes.data.data.accessToken.value, {
        expires: 1, // Thời gian tồn tại của token, hay Thời gian tồn tại của cookie
        secure: true, // Đảm bảo chỉ gửi cookies qua HTTPS
        sameSite: "Strict", // Chỉ cho phép cookies được gửi cùng trang nguồn. Tức là,
        // Kiểm soát cách thức cookie được gửi trong các yêu cầu cross-site. Strict ngăn không cho gửi cookie
        // trong các yêu cầu bên ngoài.
      });
      Cookies.set("refreshToken", OtpRes.data.data.refreshToken.value, {
        expires: 7, // Ví dụ: refreshToken tồn tại lâu hơn accessToken
        secure: true,
        sameSite: "Strict",
      });

      setSuccessAlert(true);
      // Gọi check store
      navigate({ to: "/" });
    } catch (error) {
      console.error("Lỗi khi xác thực OTP:", error);
      setErrorAlert(true);
    }
  };
  const handleResendOTP = async () => {
    try {
      const res = await authorizedAxiosInstance.post(`/auth/login/mfa/resend`, {
        code: codeLogin,
      });
      if (res.data.success) {
        setOpenAlert(true);
      }
    } catch (error) {
      console.error("Lỗi khi gửi lại OTP:", error);
      setErrorAlert(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form onSubmit={handleSubmit(submitLogIn)}>
        <Zoom in={true} style={{ transitionDelay: "200ms" }}>
          <MuiCard
            sx={{
              minWidth: 380,
              maxWidth: 380,
              marginTop: "6em",
              p: "0.5em 0",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Box>
                <h1 className="text-xl font-semibold text-gray-800">
                  Đăng nhập
                </h1>
              </Box>
            </Box>
            <Box sx={{ padding: "0 1em 1em 1em" }}>
              <Box sx={{ marginTop: "1.2em" }}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Enter Email..."
                  type="text"
                  variant="outlined"
                  error={!!errors.accountName}
                  {...register("accountName", {
                    required: "This field is required.",
                  })}
                />
                {errors.accountName && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: "0.7em",
                      ".MuiAlert-message": { overflow: "hidden" },
                    }}
                  ></Alert>
                )}
              </Box>

              <Box sx={{ marginTop: "1em" }}>
                <TextField
                  fullWidth
                  label="Enter Password..."
                  type="password"
                  variant="outlined"
                  error={!!errors.password}
                  {...register("password", {
                    required: "This field is required.",
                  })}
                />
                {errors.password && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: "0.7em",
                      ".MuiAlert-message": { overflow: "hidden" },
                    }}
                  ></Alert>
                )}
              </Box>
            </Box>
            {/* Trường/ Modal nhập OTP khi OTP đã được gửi */}
            {open && (
              <Modal
                open={open}
                closeAfterTransition
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="flex items-center justify-center"
              >
                <Fade in={open}>
                  <Box className="p-6 bg-white rounded-lg shadow-lg w-96">
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                      className="text-lg font-semibold text-gray-700"
                    >
                      Nhập OTP của bạn
                    </Typography>
                    <TextField
                      label="OTP"
                      name="otp"
                      value={inputOTP}
                      onChange={(e) => setInputOTP(e.target.value)}
                      fullWidth
                      margin="normal"
                      className="my-4"
                    />
                    <div className="flex items-center space-x-5 justify-center">
                      <Button
                        onClick={handleOTP}
                        className="w-[40%]"
                        variant="contained"
                      >
                        Xác nhận
                      </Button>
                      <Button
                        onClick={handleResendOTP}
                        className="w-[40%]"
                        variant="outlined"
                      >
                        Gửi lại
                      </Button>
                    </div>
                  </Box>
                </Fade>
              </Modal>
            )}
            <CardActions sx={{ padding: "0.5em 1em 1em 1em" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Đăng Nhập
              </Button>
            </CardActions>
            <CardActions sx={{ padding: "0.5em 1em 1em 1em" }}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                size="large"
                fullWidth
              >
                <Link to="/auth/register">Đăng Ký</Link>
              </Button>
            </CardActions>
          </MuiCard>
        </Zoom>
      </form>
      <Snackbar
        open={successAlert}
        autoHideDuration={6000}
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccessAlert} severity="success">
          Đăng nhập thành công!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          OTP đã được gửi lại!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorAlert}
        autoHideDuration={6000}
        onClose={handleCloseErrorAlert}
      >
        <Alert onClose={handleCloseErrorAlert} severity="error">
          OTP không chính xác. Vui lòng thử lại!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
