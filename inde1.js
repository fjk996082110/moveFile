const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 使用 readline 接受用户输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 获取用户输入的源目录和关键字
rl.question('请输入源目录路径: ', (sourceDirectory) => {
  rl.question('请输入要查找的文件名关键字: ', (targetKeyword) => {
    rl.question('请输入目标目录路径: ', (targetDirectory) => {

      // 确保目录路径存在
      if (!fs.existsSync(sourceDirectory)) {
        console.log('源目录不存在，请检查路径。');
        rl.close();
        return;
      }

      // const targetDirectory = path.join(sourceDirectory, targetKeyword);

      // 创建目标文件夹（如果不存在）
      if (!fs.existsSync(targetDirectory)) {
        fs.mkdirSync(targetDirectory);
      }

      // 读取源目录中的所有文件
      fs.readdir(sourceDirectory, (err, files) => {
        if (err) {
          console.error('无法读取目录内容:', err);
          rl.close();
          return;
        }

        files.forEach((file) => {
          const sourcePath = path.join(sourceDirectory, file);

          // 检查是否为PDF文件，并符合“张三_”开头或“_张三”结尾
          if (file.endsWith('.pdf') && (file.includes(`${targetKeyword}_`) || file.endsWith(`_${targetKeyword}.pdf`))) {
            const targetPath = path.join(targetDirectory, file);

            // 移动文件
            fs.rename(sourcePath, targetPath, (err) => {
              if (err) {
                console.error(`无法移动文件 ${file}:`, err);
              } else {
                console.log(`已移动文件: ${file} 到 ${targetDirectory}`);
              }
            });
          }
        });

        console.log('操作完成。');
        rl.close();
      });
    })

  });
});