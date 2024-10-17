import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Row, Col, Card } from "antd";

const Dashboard = () => {
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [employeeData, setEmployeeData] = useState([]);

  // Fetch employee data from employees.json dynamically
  useEffect(() => {
    fetch("/employees.json")  // Ensure this path is correct
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEmployeeData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  // Initialize all charts based on employee data
  useEffect(() => {
    if (employeeData.length > 0) {
      initCharts(employeeData);
    }
  }, [employeeData]);

  // Initialize all charts
  const initCharts = (data) => {
    initBarChart(data);
    initLineChart(data);
    initPieChart(data);
  };

  // Function to initialize bar chart (Total Salary by Department)
  const initBarChart = (data) => {
    const chart = echarts.init(barChartRef.current);
    const departmentSalary = data.reduce((acc, curr) => {
      acc[curr.department] = (acc[curr.department] || 0) + curr.salary;
      return acc;
    }, {});

    const departments = Object.keys(departmentSalary);
    const salaries = Object.values(departmentSalary);

    const barOptions = {
      title: { text: "Total Salary by Department" },
      xAxis: {
        type: "category",
        data: departments,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: salaries,
          type: "bar",
        },
      ],
    };
    chart.setOption(barOptions);
  };

  // Function to initialize line chart (Employees by Department)
  const initLineChart = (data) => {
    const chart = echarts.init(lineChartRef.current);
    const departmentCount = data.reduce((acc, curr) => {
      acc[curr.department] = (acc[curr.department] || 0) + 1;
      return acc;
    }, {});

    const departments = Object.keys(departmentCount);
    const counts = Object.values(departmentCount);

    const lineOptions = {
      title: { text: "Employees by Department" },
      xAxis: {
        type: "category",
        data: departments,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: counts,
          type: "line",
          smooth: true, // Optional: for a smooth line
        },
      ],
    };
    chart.setOption(lineOptions);
  };

  // Function to initialize pie chart (Employee Status Distribution)
  const initPieChart = (data) => {
    const chart = echarts.init(pieChartRef.current);
    const statusCount = data.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});

    const statuses = Object.keys(statusCount);
    const counts = Object.values(statusCount);

    const pieOptions = {
      title: { text: "Employee Status Distribution", left: 'center' },
      series: [
        {
          name: "Status",
          type: "pie",
          radius: "50%",
          data: statuses.map((status, index) => ({
            value: counts[index],
            name: status,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    chart.setOption(pieOptions);
  };

  return (
    <div>
      {/* Widgets Row */}
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Total Employees" bordered={false}>
            {employeeData.length}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Departments" bordered={false}>
            {[...new Set(employeeData.map((emp) => emp.department))].length}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Average Salary" bordered={false}>
            {(employeeData.reduce((sum, emp) => sum + emp.salary, 0) / employeeData.length).toFixed(2)}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Active Employees" bordered={false}>
            {employeeData.filter((emp) => emp.status === "Active").length}
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card>
            <div ref={barChartRef} style={{ width: "100%", height: 400 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div ref={lineChartRef} style={{ width: "100%", height: 400 }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card>
            <div ref={pieChartRef} style={{ width: "100%", height: 400 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
