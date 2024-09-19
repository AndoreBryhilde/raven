import { createApp } from 'vue';

import './assets/main.css';
import 'primevue/resources/themes/aura-dark-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'nprogress/nprogress.css';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css';

import primevue from 'primevue/config';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Knob from 'primevue/knob';
import PanelMenu from 'primevue/panelmenu';
import Row from 'primevue/row';
import Sidebar from 'primevue/sidebar';
import Textarea from 'primevue/textarea';
import Tooltip from 'primevue/tooltip';

import * as echarts from 'echarts';
import Swal from 'sweetalert2';
import mitt from 'mitt';
import App from './App.vue';
import router from './router';
// import Auth from './directive/Auth';

const app = createApp(App);

window.router = router;
window.Swal = Swal;
window.echarts = echarts;
window.emitter = mitt();

app.use(router);
app.use(primevue);

// app.directive('auth', Auth);
app.directive('tooltip', Tooltip);

app.component('Button', Button);
app.component('Calendar', Calendar);
app.component('Card', Card);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('Dropdown', Dropdown);
app.component('InputText', InputText);
app.component('Knob', Knob);
app.component('PanelMenu', PanelMenu);
app.component('Row', Row);
app.component('Sidebar', Sidebar);
app.component('Textarea', Textarea);

app.mount('#app');
