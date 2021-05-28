import React, { useState } from "react";
import { EditOutlined, DeleteFilled, UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Button, Input, Modal, Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions/alert.action";
import Alert from "../layout/Alert";
import "./homePage.css";
import axios from "axios";
import { deleteStore, updateStore } from "../../redux/actions/store.action";

const StoreList = ({ stores }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { stores, loading } = useSelector((state) => state.storeReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editStore, setEditStore] = useState({
    id: "",
    name: "",
    email: "",
    logo: "",
  });
  const [logo, setLogo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  // const { id, title, description } = addTodo;
  const editHandler = (store) => {
    setEditStore({
      id: parseInt(store.id),
      name: store.name,
      email: store.email,
      logo: store.logo,
    });
    showModal();
  };
  const handleOk = () => {
    setIsModalVisible(false);
    console.log(editStore);
    dispatch(
      updateStore(editStore.id, editStore.name, editStore.email, editStore.logo)
    );
  };

  const handleCancel = () => {
    setEditStore({
      id: "",
      name: "",
      email: "",
    });
    setIsModalVisible(false);
  };
  const onChange = (e) => {
    setEditStore({ ...editStore, [e.target.name]: e.target.value });
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
      setEditStore({ ...editStore, logo: data });
      setUploading(false);
    } catch (err) {
      console.log(err.response.data);
      setUploading(false);
    }
  };
  return (
    <div>
      <Modal
        title="update"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="*Title"
          allowClear
          value={editStore.name}
          onChange={onChange}
          name="name"
        />
        <br />
        <br />

        <Input
          placeholder="*Title"
          allowClear
          value={editStore.email}
          onChange={onChange}
          name="email"
        />
        <br />
        <br />
        <input type="file" name="imageFile" onChange={uploadFileHandler} />
      </Modal>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {stores.map((store) => (
          <Col key={store.id} className="gutter-row" span={6}>
            <div style={{ padding: "8px 0" }}>
              <Card
                hoverable
                style={{ width: 200, cursor: "default" }}
                cover={
                  <img
                    onClick={() => {
                      history.push(`/store/${store.id}`);
                    }}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                    alt="example"
                    src={store.logo}
                  />
                }
                actions={[
                  <EditOutlined
                    style={{ zIndex: "100" }}
                    key="edit"
                    onClick={() => {
                      editHandler(store);
                    }}
                  />,
                  <DeleteFilled
                    style={{ zIndex: "100" }}
                    key="delete"
                    onClick={() => {
                      dispatch(deleteStore(store.id));
                    }}
                  />,
                ]}
              >
                <p>Store Name: {store.name}</p>
                <p>{store.email}</p>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StoreList;
