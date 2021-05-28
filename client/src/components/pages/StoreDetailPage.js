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
import Pagination from "../layout/Pagination";
import { useHistory } from "react-router-dom";

const StoreDetailPage = ({ match }) => {
  const dispatch = useDispatch();

  const { store } = useSelector((state) => state.storeReducer);
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.loginReducer);
  if (!isAuthenticated) history.push("/login");
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

  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(4);
  // Get current posts
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
      <CategoryList store_id={match.params.id} categories={currentCategories} />
      <div className="pagi" style={{ padding: "10px 0" }}>
        <Pagination
          postsPerPage={categoriesPerPage}
          totalPosts={categories.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default StoreDetailPage;
