import React, { useState, useEffect } from 'react';
import { request } from '../utils/request';
import '../common/table.css'
import '../common/card.css'


const TodoPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await request.post('/api/test-page', {
          
        });
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error('请求失败:', error);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='card'>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Create Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
              <td>{item.createTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoPage;
