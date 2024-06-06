<template>
    <div class="p-4">
        <div class="mt-4">
            模型介绍
        </div>
        <el-card class="mt-2" shadow="always" :body-style="{ padding: '20px' }" @click="gotoCharge">
            <div style="color:#aaa"> 大聪明
                <el-tag type="warning" size="normal" effect="plain">
                    文本模型
                </el-tag>
            </div>
            <div>
                <li>基础款文字模型，可以聊天，无联网功能</li>
                <li>应用：基础聊天，基础问答</li>
            </div>
        </el-card>
        ### ：

        - ：基础款文字模型，可以聊天，无联网功能
        -
        - 网络冲浪手：升级款文字模型，可以聊天+联网搜索信息
        - 应用：搜索最新新闻/天气/资讯和更多网络信息
        - 长眼睛Siri：可以使用摄像头拍照能力进行聊天
        - 应用：估算食物热量、拍照解题、辅助看病历/报告 等
        - 读屏幕：可以获取屏幕上的信息和分析能力
        - 应用：辅助做题、新闻资讯翻译、辅助游戏等
    </div>
</template>