<template>
  <div id="app">
    <!-- 引入 echarts.js -->
    <!-- <div id="main" style="width: 600px;height:400px;"></div> -->
    <!-- <div id="nav">
      <el-button>按钮</el-button>
    </div> -->
    <input type="button" value="导入" id="import" />
    <input type="button" value="导出" id="export" onclick="exportAnswers()">
    <input type="button" value="得分" id="score" onclick="score()">
    <input type="button" value="草稿" id="draft" onclick="saveDraft()">
    <input type="button" value="读草稿" id="draft" onclick="readDraft()">
    <input type="file" value="导入范围" id="upload" style="display:none;" onclick="return fileUpload_onclick()"
        onchange="return fileUpload_onselect()" />
    <div id='questions'>

    </div>
  </div>
</template>

