const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 提示用户输入源目录
rl.question('请输入源目录路径: ', (sourceDir) => {
  // 提示用户输入目标目录
  rl.question('请输入目标目录路径: ', (targetDir) => {
    // 读取源目录中的文件和文件夹
    fs.readdir(sourceDir, (err, files) => {
      if (err) {
        console.error('读取源目录失败:', err);
        rl.close();
        return;
      }

      // 遍历所有文件
      files.forEach(file => {
        // 检查文件是否是 PDF
        if (file.endsWith('.pdf')) {
          // 获取人名
          const name = file.split('_').pop().replace('.pdf', '');

          // 构建目标文件夹路径
          const targetFolder = path.join(targetDir, `立案材料_${name}`);

          // 检查目标文件夹是否存在
          if (fs.existsSync(targetFolder)) {
            // 移动文件
            const sourceFilePath = path.join(sourceDir, file);
            const targetFilePath = path.join(targetFolder, file);

            fs.rename(sourceFilePath, targetFilePath, (err) => {
              if (err) {
                console.error(`移动文件失败: ${file} - ${err}`);
              } else {
                console.log(`已移动: ${file} 到 ${targetFolder}`);
              }
            });
          } else {
            console.log(`目标文件夹不存在: ${targetFolder}`);
          }
        }
      });
      rl.close();
    });
  });
});
