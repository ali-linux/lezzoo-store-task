import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Input, Divider, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions/alert.action";
import Alert from "../layout/Alert";
import "./homePage.css";
import axios from "axios";
import StoreList from "./StoreList";
import { getStores, addStore } from "../../redux/actions/store.action";
import Pagination from "../layout/Pagination";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.loginReducer);
  const { stores, loading } = useSelector((state) => state.storeReducer);

  if (!isAuthenticated) history.push("/login");

  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [store, setStore] = useState({
    name: "",
    email: "",
  });
  const [uploading, setUploading] = useState(false);

  const [logo, setLogo] = useState(null);
  const { name, email } = store;
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if ((name === "", email === "")) {
      dispatch(setAlert("name is required", "danger"));
      dispatch(setAlert("email is required", "danger"));
    } else {
      dispatch(addStore(name, email, logo));
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("imageFile", file);

    setUploading(true);
    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": token,
      },
    };

    try {
      const { data } = await axios.post(`/api/store/upload/`, formData, config);

      setLogo(data);
      setUploading(false);
    } catch (err) {
      console.log(err.response.data);
      setUploading(false);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [storesPerPage] = useState(4);
  // Get current posts
  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentStore = stores.slice(indexOfFirstStore, indexOfLastStore);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Modal
        title="add Store"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Alert />
        <Input
          type="name"
          placeholder="Store Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <br />
        <br />
        <Input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <br />
        <br />
        <input type="file" name="imageFile" onChange={uploadFileHandler} />
      </Modal>
      <div className="addBtn" style={{ margin: "20px 10px" }}>
        <Button
          type="default"
          block
          style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          onClick={showModal}
        >
          Add Store
        </Button>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <Fragment>
          <Divider orientation="left">Stores</Divider>
          <StoreList stores={currentStore} />
          <div className="pagi" style={{ padding: "10px 0" }}>
            <Pagination
              postsPerPage={storesPerPage}
              totalPosts={stores.length}
              paginate={paginate}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default HomePage;
