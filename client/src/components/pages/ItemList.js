import React, { useState } from "react";
import { EditOutlined, DeleteFilled, UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Button, Input, Modal, Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions/alert.action";
import Alert from "../layout/Alert";
import "./homePage.css";
import axios from "axios";
import { deleteItem, updateItem } from "../../redux/actions/item.action";

const ItemList = ({ store_id, category_id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { items } = useSelector((state) => state.itemReducer);
  // const { stores } = useSelector((state) => state.itemReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    price: 0,
    stock: 0,
    image: "",
    category_id,
    store_id,
  });
  // const store_name =
  const { name, image, price, stock } = editItem;
  const [itemImage, setItemImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  // const { id, title, description } = addTodo;
  const editHandler = ({
    id,
    name,
    image,
    price,
    stock,
    store_id,
    category_id,
  }) => {
    setEditItem({
      id: parseInt(id),
      name,
      image,
      price,
      stock,
      store_id,
      category_id,
    });
    showModal();
  };
  const handleOk = () => {
    setIsModalVisible(false);
    console.log(editItem);
    dispatch(
      updateItem(editItem.id, name, image, price, stock, store_id, category_id)
    );
  };

  const handleCancel = () => {
    setEditItem({
      id: "",
      name: "",
      price: 0,
      stock: 0,
    });
    setIsModalVisible(false);
  };
  const onChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
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

      setItemImage(data);
      setEditItem({ ...editItem, image: data });
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
          type="name"
          placeholder="item Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <br />
        <br />
        <Input
          type="price"
          placeholder="price "
          name="price"
          value={price}
          onChange={onChange}
          required
        />
        <br />
        <br />
        <Input
          type="stock"
          placeholder="stock"
          name="stock"
          value={stock}
          onChange={onChange}
          required
        />
        <br />
        <br />
        <input type="file" name="imageFile" onChange={uploadFileHandler} />
      </Modal>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {items.map((item) => (
          <Col key={item.id} className="gutter-row" span={8}>
            <div style={{ padding: "8px 0" }}>
              <Card
                key={item.id}
                hoverable
                style={{ width: 200 }}
                cover={
                  <img
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                    }}
                    alt="example"
                    src={"/" + item.image}
                  />
                }
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      editHandler(item);
                    }}
                  />,
                  <DeleteFilled
                    key="delete"
                    onClick={() => {
                      dispatch(deleteItem(item.id));
                    }}
                  />,
                ]}
              >
                <p>Name: {item.name}</p>
                <p>Price: {item.price}</p>
                <p>inStock: {item.stock}</p>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ItemList;
