<template>
  <div id="app">
    <navBar></navBar>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import { routes } from './routes';
import navBar from './components/Nav/SideBar.vue'


export default {
  name: "App",
  components:{
    navBar
  },
  data(){
    return {
      routes
    }
  }
};
</script>

<style>
/* --- FONTS --- */
/* TODO: verify if all fonts is been used */
/* ~ BebasNeue ~ */
@font-face {
  font-family: 'BebasNeue';
  src: url('assets/fonts/BebasNeue/BebasNeue-Regular.ttf');
}
/* ~ Open Sans ~ */
/* TODO: change to local files */
@font-face {
  font-family: 'Open Sans';
  src: url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');
}
/* ~ Akrobat ~ */
@font-face {
  font-family: 'Akrobat';
  src: url('assets/fonts/Akrobat/Akrobat-Thin.woff') format("woff");
  font-weight: 100;
}
@font-face {
  font-family: 'Akrobat';
  src: url('assets/fonts/Akrobat/Akrobat-ExtraLight.woff') format("woff");
  font-weight: 200;
}
@font-face {
  font-family: 'Akrobat';
  src: url('assets/fonts/Akrobat/Akrobat-Light.woff') format("woff");
  font-weight: 300;
}
@font-face {
  font-family: 'Akrobat';
  src: url('assets/fonts/Akrobat/Akrobat-Regular.woff') format("woff");
}
@font-face {
  font-family: 'Akrobat';
  src: url('assets/fonts/Akrobat/Akrobat-SemiBold.woff') format("woff");
  font-weight: 700;
}
@font-face {
  font-family: 'Akrobat';
  src: url('assets/fonts/Akrobat/Akrobat-Bold.woff') format("woff");
  font-weight: 800;
}
@font-face {
  font-family: 'Akrobat';
  src: url('assets/fonts/Akrobat/Akrobat-ExtraBold.woff') format("woff");
  font-weight: 900;
}
@font-face {
  font-family: 'Akrobat';
  src: url('assets/fonts/Akrobat/Akrobat-Black.woff') format("woff");
  font-weight: 1000;
}

/* --- GLOBALS --- */
/* ~ Rounded ~ */
.__rounded-100 {
  border-radius: 100% !important
}
.__rounded {
  border-radius: 10px !important
}
.__rounded-tl {
  border-top-left-radius: 10px !important
}
.__rounded-tr {
  border-top-right-radius: 10px !important
}
.__rounded-bl {
  border-bottom-left-radius: 10px !important
}
.__rounded-br {
  border-bottom-right-radius: 10px !important
}

/* ~ Shadow ~ */
.__shadow {
  box-shadow: 0 0 10px rgba(0,0,0,0.03);
}

/* ~ SWITCH ~ */
.switch {
  font-size: 1rem;
  position: relative;
}
.switch input {
  position: absolute;
  height: 1px;
  width: 1px;
  background: none;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  overflow: hidden;
  padding: 0;
}
.switch input + label {
  position: relative;
  min-width: calc(calc(2.375rem * .8) * 2);
  border-radius: calc(2.375rem * .8);
  height: calc(2.375rem * .8);
  line-height: calc(2.375rem * .8);
  display: inline-block;
  cursor: pointer;
  outline: none;
  user-select: none;
  vertical-align: middle;
  text-indent: calc(calc(calc(2.375rem * .8) * 2) + .5rem);
}
.switch input + label::before,
.switch input + label::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: calc(calc(2.375rem * .8) * 2);
  bottom: 0;
  display: block;
}
.switch input + label::before {
  right: 0;
  background-color: #dee2e6;
  border-radius: calc(2.375rem * .8);
  transition: 0.2s all;
}
.switch input + label::after {
  top: 2px;
  left: 2px;
  width: calc(calc(2.375rem * .8) - calc(2px * 2));
  height: calc(calc(2.375rem * .8) - calc(2px * 2));
  border-radius: 50%;
  background-color: white;
  transition: 0.2s all;
}
.switch input:checked + label::before {
  background-color: #08d;
}
.switch input:checked + label::after {
  margin-left: calc(2.375rem * .8);
}
.switch input:focus + label::before {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 136, 221, 0.25);
}
.switch input:disabled + label {
  color: #868e96;
  cursor: not-allowed;
}
.switch input:disabled + label::before {
  background-color: #e9ecef;
}
.switch.switch-sm {
  font-size: 0.875rem;
}
.switch.switch-sm input + label {
  min-width: calc(calc(1.9375rem * .8) * 2);
  height: calc(1.9375rem * .8);
  line-height: calc(1.9375rem * .8);
  text-indent: calc(calc(calc(1.9375rem * .8) * 2) + .5rem);
}
.switch.switch-sm input + label::before {
  width: calc(calc(1.9375rem * .8) * 2);
}
.switch.switch-sm input + label::after {
  width: calc(calc(1.9375rem * .8) - calc(2px * 2));
  height: calc(calc(1.9375rem * .8) - calc(2px * 2));
}
.switch.switch-sm input:checked + label::after {
  margin-left: calc(1.9375rem * .8);
}
.switch.switch-lg {
  font-size: 1.25rem;
}
.switch.switch-lg input + label {
  min-width: calc(calc(3rem * .8) * 2);
  height: calc(3rem * .8);
  line-height: calc(3rem * .8);
  text-indent: calc(calc(calc(3rem * .8) * 2) + .5rem);
}
.switch.switch-lg input + label::before {
  width: calc(calc(3rem * .8) * 2);
}
.switch.switch-lg input + label::after {
  width: calc(calc(3rem * .8) - calc(2px * 2));
  height: calc(calc(3rem * .8) - calc(2px * 2));
}
.switch.switch-lg input:checked + label::after {
  margin-left: calc(3rem * .8);
}
.switch + .switch {
  margin-left: 1rem;
}

/* --- CARD --- */
/* Wrapper */
.__card-container {
  /* display: flex; */
  padding: 0 !important;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1)
}

/* Card */
.__card {
  background-color: #fff;
  border: 1px solid #ddd
}

.__card-header {
  font-weight: 700
}

.__card-title, .__card-text {
  color: #000;
  margin-bottom: 0
}

/* Middle */
.__card, .__card-header {
  border-radius: 0
}

/* Left */
.__card-wrapper:first-child .__card {
  border-radius: 10px 0 0 10px
}

.__card-wrapper:first-child .__card .__card-header {
  border-radius: 10px 0 0 0
}

/* Right */
.__card-wrapper:last-child .__card {
  border-radius: 0 10px 10px 0
}

.__card-wrapper:last-child .__card .__card-header {
  border-radius: 0 10px 0 0
}

/* Only One */
.__card-wrapper:only-child .__card{
  border-radius: 10px
}

.__card-wrapper:only-child .__card-header {
  border-radius: 10px 10px 0 0
}

.popover {
  border-radius: 10px !important
}

.popover-header {
  border-radius: 10px 10px 0 0 !important
}

/* --- SEARCH CARDS --- */
/* TODO: change to .search class */
.search-card, .search-results  {
  position: relative;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0px 10px rgba(0,0,0,0.05);
}

.search-card .infos {
  cursor: pointer
}

.search-card .switch label {
  font-weight: 800
}

/* ~ header ~ */
.search-card-header {
  border-radius: 10px 10px 0 0;
  background-color: #6dcff6;
  color: white;
}

.search-card-header > .wrapper, .search-card-header > .title {
  padding: 10px 20px;
}

.search-card-header .title {
  font-weight: 800
}

/* ~ header badge ~ */
.search-card-header-badge {
  border-top-right-radius: 10px;
  transition: .3s
}

.search-card-header-badge .switch input + label::before, .search-card-header-badge .switch input:checked + label::before {
  background-color: #dee2e6;
}

/* ~ wrapper ~ */
.search-card > .wrapper, .search-results .wrapper {
  padding: 20px;
}

/* ~ wrapper ~ */
.search-card-body label {
  font-weight: 800
}

.search-card-body input, .search-card-body select, .search-card-body select option {
  border-radius: 10px !important;
  text-align: center !important;
}

.search-card-body input[type="date"] {
  border-radius: 10px 0 0 10px !important;
}

.search-card-body input[type="time"] {
  border-radius: 0 10px 10px 0 !important;
}

/* ~ footer ~ */
.search-card-footer .btnPesquisar {
  border-radius: 10px 0 10px 0 !important;
  font-weight: 800;
  font-size: 1.2rem
}

/* --- SEARCH RESULTS --- */
.search-results {
  transition: .3s border-color;
  border-top: 10px solid #6dcff6;
}

.search-results-header .title {
  color: #6dcff6;
  font-weight: 800
}

.search-results .results-options {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
}

.search-results .results-options .export .handler:hover, .search-results .results-options .view-graphs:hover, .search-results .results-options .export .handler:focus, .search-results .results-options .view-graphs:focus {
  padding-left: 25px !important;
  padding-right: 25px !important;
}

.search-results table th, .search-results table td{
  text-align: center;
  vertical-align: middle;
}

.search-results table .actions button img {
  width: 20px
}

/* --- RESULTS OPTIONS --- */
.results-options > div {
  display: flex;
  justify-content: flex-end;
}

.results-options > div img, .results-options > div svg {
  width: 20px
}

.results-options .export .handler, .results-options .view-graphs, .results-options .export .dropdown-item {
  cursor: pointer;
}

.results-options .export .handler, .results-options .view-graphs {
  color: white;
  transition: all .4s, background .3s;
}

.results-options .export .handler {
  background-color: #6dcff6;
  border-radius: 0 0 0 10px;
}

.results-options .view-graphs {
  background-color: darkorange;
  border-radius: 10px 0 0 10px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  background-color: whitesmoke;
  min-height: 100vh
}

.alert {
  border-radius: 10px !important
}
</style>
