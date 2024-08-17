import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Run from './Run';
import routes from '../route/routes'; // 包含路由数据结构

function AppRouter() {
  return (
    <Router>
      <Run routes={routes} />
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default AppRouter;
