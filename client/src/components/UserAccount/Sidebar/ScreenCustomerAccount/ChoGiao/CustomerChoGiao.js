import React, { useEffect, useState } from "react";
import axios from "axios";
import { MainAPI } from "../../../../API";
import { formatVND } from "../../../../../utils/Format";
import useAuth from "../../../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

export default function CustomerChoGiao({ title }) {
  const [confirmOrderList, setConfirmOrderList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const { auth } = useAuth();

  const token = JSON.parse(localStorage.getItem("accessToken"));
  console.log(token);

  useEffect(() => {
    axios
      .post(`${MainAPI}/order/get-order-by-user-id-confirm-status`, {
        user_id: auth.user.user_id,
      })
      .then((res) => {
        console.log(res.data);
        setConfirmOrderList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={title === "Chờ giao" ? "chogiao" : "fade"}>
      <h5 className="fw-bold">{title}</h5>
      <ToastContainer />
      {confirmOrderList.length === 0 ? (
        <div className="emptyinfo">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Faccount%2Fchogiao.png?alt=media&token=8580382f-7bc6-477f-a95e-38b3a06eb189"
            }
          />
          <p>
            Hiện chưa có đơn hàng nào <br />
            đang chờ được giao
          </p>
        </div>
      ) : (
        confirmOrderList.map((dagiao) => {
          return (
            <>
              <div className="order">
                {dagiao.products.map((product, index) => {
                  return (
                    <>
                      <div className="tab-content">
                        <div key={index} className="cart-product-line d-flex ">
                          <div className="product-img">
                            <img src={product.image_url} alt="1" />
                          </div>
                          <div className="product-info w-100">
                            <div className="item-cart-product-name">
                              {product.product_name}
                            </div>
                            <div className="d-flex w-100 align-center product-info-bottom">
                              <span style={{ width: 600 }}></span>
                              <div className="item-cart-quantity-pro">
                                x{product.quantity}
                              </div>
                              <div className="item-cart-price-pro mr-0 ">
                                {formatVND(product.price)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="px-20 container font-13 mt-20 color-20 pb-20 line-height-13 border-top-f2 block-end">
                  <span className="d-flex w-100  align-center justify-content-between">
                    <span className="w-50">
                      <span className="color-20">Có </span>
                      <span className="font-bold font-15 line-height-15 color-20">
                        {dagiao.products.length} sản phẩm
                      </span>
                    </span>
                    <span
                      className=" d-flex justify-content-between align-items-end"
                      style={{ width: 180 }}
                    >
                      <span>Tiền tích lũy</span>
                      <span className="font-bold font-15 line-height-15 cc-pink-primary">
                        100000đ
                      </span>
                    </span>
                  </span>

                  <span className="d-flex align-center align-items-end w-100 justify-content-between">
                    <span className="w-50 align-items-end d-flex">
                      <span>Mã đơn </span>
                      <span className="font-bold font-15 d-inline-flex align-items-end color-20">
                        #{dagiao.order_id}
                      </span>
                    </span>
                    <span className=" d-flex  align-items-end  justify-content position-relative color-20 font-13">
                      <span
                        className=" d-flex  align-items-end  justify-content position-relative color-20 font-13"
                        style={{ width: 115 }}
                      >
                        Thành tiền
                      </span>
                      <span className="font-bold font-15 line-height-15 color-20">
                        {formatVND(dagiao.total_amount)}
                      </span>
                    </span>
                  </span>

                  <span className="d-flex justify-content-end mt-3"></span>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
}
