import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoreDetail } from "../../redux/actions/store.action";
import {
  getCategories,
  deleteCategory,
  addCategory,
} from "../../redux/actions/category.action";
import { Button, Modal, Input } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import CategoryList from "./CategoryList";
import { setAlert } from "../../redux/actions/alert.action";
import Alert from "../layout/Alert";

const StoreDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.storeReducer);
  const { categories } = useSelector((state) => state.categoryReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [category, setCategory] = useState({
    name: "",
  });
  const { name } = category;
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (name === "") {
      dispatch(setAlert("name is required", "danger"));
    } else {
      dispatch(addCategory(name, match.params.id));
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChange = (e) => {
    setCategory({ ...store, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const store_id = match.params.id;
    dispatch(getStoreDetail(store_id));
    dispatch(getCategories(store_id));
  }, [dispatch, match.params.id]);

  return (
    <div>
      <h1>Store Name: {store.name}</h1>
      <Modal
        title="add Category"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Alert />
        <Input
          type="name"
          placeholder="Category Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <br />
        <br />
      </Modal>
      <div className="addBtn" style={{ margin: "20px 10px" }}>
        <Button
          type="default"
          block
          style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          onClick={showModal}
        >
          Add Category
        </Button>
      </div>
      <CategoryList store_id={match.params.id} />
      {/* <table className="table">
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
                <Link to={`/store/${match.params.id}/category/${category.id}`}>
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
      </table> */}
    </div>
  );
};

export default StoreDetailPage;
