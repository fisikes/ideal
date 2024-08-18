import ClientPage from "../components/biz/ClientPage";
import Home from "../components/biz/Home";
import DiskMapping from "../components/dnd/DiskMapping";
import DndDemo from "../pages/DndDemo";
import TodoPage from "../pages/TodoPage";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/todoPage', name: 'TodoPage', component: TodoPage },
    { path: '/dndDemo', name: 'dndDemo', component: DndDemo },
    { path: '/diskMapping', name: 'disk mapping', component: DiskMapping },
    { path: '/client3', name: 'ClientPage3', component: ClientPage },
    { path: '/client4', name: 'ClientPage4', component: ClientPage },
    { path: '/client5', name: 'ClientPage5', component: ClientPage },
    { path: '/client6', name: 'ClientPage6', component: ClientPage },
    { path: '/client7', name: 'ClientPage7', component: ClientPage },
    { path: '/client8', name: 'ClientPage8', component: ClientPage },
    { path: '/client9', name: 'ClientPage9', component: ClientPage },
    { path: '/client10', name: 'ClientPage10', component: ClientPage },
    { path: '/client11', name: 'ClientPage11', component: ClientPage },
    { path: '/client12', name: 'ClientPage12', component: ClientPage },
    { path: '/client13', name: 'ClientPage13', component: ClientPage },
];


export default routes;