import imgAddProduct from '../assets/images/timkiem.png' 
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material';
function ProductPage() {


  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current!.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  
  
  return (
    <>
    <div className="w-screen h-screen bg-gray-100 p-[10px] " >

    <div className="head flex justify-between p-5">
       <p className="text-[25px] font-bold">Quản lý sản phẩm</p>
        <div className="actions flex gap-1 h-max">
            <Button variant="outlined">Xem gợi ý sản phẩm hot</Button>
            <Button variant="outlined"
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >

         <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}  >Profile</MenuItem>
                    <MenuItem onClick={handleClose}  >My account</MenuItem>
                    <MenuItem onClick={handleClose}  >Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

            Công cụ phân tích <ArrowDropDownIcon />
            </Button>
          
           
            <Button variant="outlined">Quản lý số lượng lớn</Button>
            <Button variant="outlined">+ Thêm sản phẩm</Button>
            </div>
   </div>

<div className="body w-screen h-max bg-[#E9F2FF] p-[10px] rounded-[8px] " >
  
 <p>Bắt đầu từ ngày 30 tháng 8 năm 2024, Lazada sẽ xem xét và xóa tất cả các thuộc tỉnh và giá trị danh mục. 
  Vui lòng xem lại sản phẩm của bạn và đảm bảo các thuộc tính sản phẩm của bạn đầy đủ, chính xác và cập nhật.
  <a href="" className="text-blue-600"> Leam More</a>. Bắt đầu từ ngày x 21 tháng 10, Lazada sẽ cập nhật Bảng kích thước cho ngành thời trang. 
   Bắt đầu từ ngày 15 tháng 11, Bảng kích thước cho các danh mục Thời trang nữ sẽ trở thành bắt buộc <a href="" className="text-blue-600">Tìm hiểu thêm</a>.<br />
  Sản phẩm của bạn chưa được hiển thị. Vụ lòng <a href="" className="text-blue-600">thêm địa chỉ</a> and <a href="" className="text-blue-600">và bổ sung chứng từ</a> để sản phẩm cơ thể hiện thị
  </p>

</div>
<div className="listProduct flex items-center justify-center flex-col  w-screen h-[400px] bg-white rounded-[20px] mt-5 shadow-lg shadow-indigo-100/50">

<img src="{imgAddProduct}" className='w-[100px] h-[100px]' />
<p className='text-[25px] font-bold'>Bạn hiện chưa có sản phẩm nào </p>
<p>Đây là nơi giúp bạn quản lý sản phẩm của mình. Hãy đăng sản phẩm và bắt đầu kinh doanh trên Lazada ngay từ bây giờ.</p>
<Button variant="contained">Thêm sản phẩm</Button>
</div>

<div className="footer flex justify-between mt-[40px] text-gray-500 text-[10px]">
  <div className="left ">Lazada 2024 ALL rigths </div>
  <div className="right flex gap-[10px]">
    <a href="">Lazada University</a>
    <a href="">Vay kinh doanh</a>
    <a href="">API Document</a>
    <a href="">Trung tâm hỗ trợ</a>
    <a href="">Ứng dụng lazada  Seller Center</a>
  </div>
</div>
    </div>
        </>
  )
}

export default ProductPage
