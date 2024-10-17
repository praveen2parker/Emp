// src/App.js
import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"; // Use Routes
import Dashboard from "./components/dashboard";
import Emp from "./components/emp";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/employees">Employees</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "16px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Emp />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>Ant Design Layout Example</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
