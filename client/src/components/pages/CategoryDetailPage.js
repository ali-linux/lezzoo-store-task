import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Input, Divider, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions/alert.action";
import Alert from "../layout/Alert";
import "./homePage.css";
import axios from "axios";
import ItemList from "./ItemList";
import { getItems, addItem } from "../../redux/actions/item.action";
import { getCategory } from "../../redux/actions/category.action";
import { getStoreDetail } from "../../redux/actions/store.action";
import Pagination from "../layout/Pagination";
const CategoryDetailPage = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.loginReducer);
  const { items, loading } = useSelector((state) => state.itemReducer);
  const { store } = useSelector((state) => state.storeReducer);
  const { category } = useSelector((state) => state.categoryReducer);
  if (!isAuthenticated) history.push("/login");

  useEffect(() => {
    dispatch(getItems(match.params.id, match.params.category_id));
    dispatch(getCategory(match.params.category_id));
    if (store.name === undefined || category.name === undefined) {
      dispatch(getStoreDetail(match.params.id));
    }
  }, [dispatch, match.params]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [item, setItem] = useState({
    name: "",
    image: "",
    price: 0,
    stock: 0,
    store_id: match.params.id,
    category_id: match.params.category_id,
  });
  const [uploading, setUploading] = useState(false);

  const [itemImage, setItemImage] = useState(null);
  const { name, image, price, stock, store_id, category_id } = item;
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (name.length === 0 || price <= 0 || stock <= 0) {
      dispatch(setAlert("name is required", "danger"));
      dispatch(setAlert("price is required", "danger"));
      dispatch(setAlert("stock is required", "danger"));
    } else {
      setIsModalVisible(false);
      dispatch(addItem(name, itemImage, price, stock, category_id, store_id));
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    console.log(file);
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
      const { data } = await axios.post("/api/store/upload/", formData, config);

      setItemImage(data);
      setUploading(false);
    } catch (err) {
      console.log(err.response.data);
      setUploading(false);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  // Get current posts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>
        <img
          src={"/" + store.logo}
          style={{ width: "40px", height: "40px", objectFit: "contain" }}
        />
        store name: {store.name} -- category : {category.name}
      </h1>
      <Modal
        title="add item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Alert />
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
      <div className="addBtn" style={{ margin: "20px 10px" }}>
        <Button
          type="default"
          block
          style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          onClick={showModal}
        >
          Add item
        </Button>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <Fragment>
          <Divider orientation="left">Items</Divider>
          <ItemList
            items={currentItems}
            store_id={store_id}
            category_id={category_id}
          />
          <div className="pagi" style={{ padding: "10px 0" }}>
            <Pagination
              postsPerPage={itemsPerPage}
              totalPosts={items.length}
              paginate={paginate}
              category_id={category_id}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CategoryDetailPage;
