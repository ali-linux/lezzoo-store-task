import React, { useState } from "react";
import { EditOutlined, DeleteFilled, UploadOutlined } from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import { Button, Input, Modal, Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  updateCategory,
} from "../../redux/actions/category.action";
import { setAlert } from "../../redux/actions/alert.action";
import Alert from "../layout/Alert";
import "./homePage.css";

const CategoryList = ({ store_id }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editCategory, setEditCategory] = useState({
    name: "",
  });

  const showModal = () => {
    setIsModalVisible(true);
  };
  // const { id, title, description } = addTodo;
  const editHandler = (store) => {
    setEditCategory({
      id: parseInt(store.id),
      name: store.name,
      email: store.email,
      logo: store.logo,
    });
    showModal();
  };
  const handleOk = () => {
    setIsModalVisible(false);
    console.log(editCategory);
    dispatch(updateCategory(editCategory.id, editCategory.name, store_id));
  };

  const handleCancel = () => {
    setEditCategory({
      id: "",
      name: "",
      email: "",
    });
    setIsModalVisible(false);
  };
  const onChange = (e) => {
    setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
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
          value={editCategory.name}
          onChange={onChange}
          name="name"
        />
        <br />
        <br />
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>

            <th scope="col">store id</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <th scope="row">{category.id}</th>
              <td>
                <Link to={`/store/${store_id}/category/${category.id}`}>
                  {category.name}
                </Link>
              </td>
              <td>{category.store_id}</td>
              <td>
                <EditOutlined
                  style={{
                    cursor: "pointer",
                    color: "green",
                    width: "50px",
                    height: "50px",
                  }}
                  onClick={() => {
                    editHandler(category);
                  }}
                />
              </td>
              <td>
                <DeleteFilled
                  style={{
                    cursor: "pointer",
                    color: "red",
                    width: "50px",
                    height: "50px",
                  }}
                  onClick={() => {
                    dispatch(deleteCategory(category.id));
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
