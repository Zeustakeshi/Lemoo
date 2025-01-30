import {
  Alert,
  Box,
  Button,
  CardActions,
  Fade,
  Modal,
  Card as MuiCard,
  Snackbar,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import Cookies from "js-cookie";
import { useState } from "react";

import athorizedAxiosInstance from "../../utils/athorizedAxios";
import { API_ROOT } from "../../utils/contants";

// Define the interface for form fields
interface RegisterFormInputs {
  email: string;
  username: string;
  phone: string;
  password: string;
}

const Resgister = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  //   const navigate = useNavigate();
  const [open, setOpen] = useState(false); // Trạng thái để kiểm tra OTP đã được gửi
  const [otpSend, setOtpSend] = useState(false); // Trạng thái để kiểm tra OTP đã xác nhận đúng
  const [inputOTP, setInputOTP] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false); // Error alert state
  const [successAlert, setSuccessAlert] = useState(false); // Success alert state
  const [codeRegister, setCodeRegister] = useState("");

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleCloseErrorAlert = () => {
    setErrorAlert(false);
  };
  const handleCloseSuccessAlert = () => {
    setSuccessAlert(false);
  };

  const submitRegister = async (data: RegisterFormInputs) => {
    // Gọi API đăng ký trước khi gọi API OTP
    if (!otpSend) {
      try {
        const res = await athorizedAxiosInstance.post(`/auth/register`, data);
        setCodeRegister(res.data.data.code); // sau khi gọi thành công API đăng ký thì lấy cái code

        // Mở cái Trường/ Modal OTP ra vì gọi thành công API đăng ký => OTP đã được gửi
        setOpen(true);
        setOtpSend(true);
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
      }
    }
  };
  const handleOTP = async () => {
    try {
      const OtpRes = await athorizedAxiosInstance.post(
        `/auth/register/otp/verify`,
        { code: codeRegister, otp: inputOTP }
      );
      // Lưu accessToken và refreshToken vào cookies
      Cookies.set("accessToken", OtpRes.data.data.accessToken.value, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("refreshToken", OtpRes.data.data.refreshToken.value, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      setSuccessAlert(true);
      navigate({ to: "/" });
    } catch (error) {
      console.error("Lỗi khi xác thực OTP:", error);
      setErrorAlert(true);
    }
  };

  const handleResendOTP = async () => {
    try {
      const res = await athorizedAxiosInstance.post(
        `/auth/register/otp/resend`,
        { code: codeRegister }
      );
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
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.1)",
      }}
    >
      <form onSubmit={handleSubmit(submitRegister)}>
        <Zoom in={true} style={{ transitionDelay: "200ms" }}>
          <MuiCard
            sx={{
              minWidth: 380,
              maxWidth: 380,
              marginTop: "6em",
              p: "1.5em",
              borderRadius: 4,
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
            }}
          >
            <Box
              sx={{
                padding: "0 1em 1em 1em",
                display: "flex",
                justifyContent: "center",
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Box>
                <h1 className="text-xl font-semibold text-gray-800">Đăng Ký</h1>
              </Box>
            </Box>
            <Box sx={{ padding: "0 1em 0 1em" }}>
              <TextField
                fullWidth
                label="Your Phone..."
                type="phone"
                variant="outlined"
                error={!!errors.phone}
                {...register("phone", {
                  required: "This field is required.",
                })}
              />
              {errors.phone && (
                <Alert
                  severity="error"
                  sx={{
                    mt: "0.7em",
                    ".MuiAlert-message": {
                      overflow: "hidden",
                    },
                  }}
                ></Alert>
              )}
            </Box>
            <Box sx={{ padding: "0 1em 1em 1em" }}>
              <Box sx={{ marginTop: "1.2em" }}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Email..."
                  type="text"
                  variant="outlined"
                  error={!!errors.email}
                  {...register("email", {
                    required: "This field is required.",
                  })}
                />
                {errors.email && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: "0.7em",
                      ".MuiAlert-message": {
                        overflow: "hidden",
                      },
                    }}
                  ></Alert>
                )}
              </Box>
              <Box sx={{ marginTop: "1.2em" }}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Name..."
                  type="text"
                  variant="outlined"
                  error={!!errors.username}
                  {...register("username", {
                    required: "This field is required.",
                  })}
                />
                {errors.username && (
                  <Alert
                    severity="error"
                    sx={{
                      mt: "0.7em",
                      ".MuiAlert-message": {
                        overflow: "hidden",
                      },
                    }}
                  ></Alert>
                )}
              </Box>{" "}
              <Box sx={{ marginTop: "1em" }}>
                <TextField
                  fullWidth
                  label="Password..."
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
                      ".MuiAlert-message": {
                        overflow: "hidden",
                      },
                    }}
                  ></Alert>
                )}
              </Box>
              {/* <Box sx={{ marginTop: "1em" }}>
                  <TextField
                    fullWidth
                    label="Confirm Password..."
                    type="password"
                    variant="outlined"
                    error={!!errors.confirmPassword}
                    {...register("confirmPassword", {
                      required: "This field is required.",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match.",
                    })}
                  />
                  {errors.confirmPassword && (
                    <Alert
                      severity="error"
                      sx={{
                        mt: "0.7em",
                        ".MuiAlert-message": { overflow: "hidden" },
                      }}
                    ></Alert>
                  )}
                </Box> */}
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
                    <Box
                      className="p-6 bg-white rounded-lg shadow-lg w-96"
                      sx={{
                        padding: "2em",
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        width: "400px",
                        maxWidth: "90%",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                        className="text-lg font-semibold text-gray-700"
                        sx={{ mb: "1.5em", fontWeight: "bold", color: "#333" }}
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
            </Box>

            <CardActions sx={{ padding: "0.5em 1em 1em 1em" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Register
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
          Đăng ký thành công!
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

export default Resgister;
