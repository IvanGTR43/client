import React,{ useState, useEffect } from 'react';
import { Pagination as PaginationAntd } from "antd";
import "./Pagination.scss";
export default function Pagination(props) {
  const { posts, location, history } = props;
  const [limit, setLimit] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  useEffect(() => {
    if(posts){
      setLimit(posts.total);
      setcurrentPage(parseInt(posts.page));
      setPageSize(posts.limit);
    }
  }, [posts]);
  const onChangePage = (newPage) => {
    history.push(`${location.pathname}?page=${newPage}`);
  }


  return (
    <PaginationAntd
      defaultCurrent={currentPage}
      total={limit}
      pageSize={pageSize}
      onChange={ e => onChangePage(e)}
      className="pagination"/>
  )
}
