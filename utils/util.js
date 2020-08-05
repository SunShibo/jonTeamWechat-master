const formatTime = date => {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()

      return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTime1 = date => {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()

      return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}


const forTimeStamp = function (date) {
      return formatTime(new Date(date));
}



const formatDate = date => {
      let d = new Date(date);
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const day = d.getDate()
      return [year, month, day].map(formatNumber).join('/');
}

const formatDateByLine = date => {
      let d = new Date(date);
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const day = d.getDate()
      return [year, month, day].map(formatNumber).join('-');
}


const forTimeStampToWeek = function (date) {
      let d = new Date(date);
      const month = d.getMonth() + 1
      const day = d.getDate()
      let days = d.getDay()
      switch (days) {
            case 1:
                  days = '星期一';
                  break;
            case 2:
                  days = '星期二';

                  break;
            case 3:

                  days = '星期三';

                  break;

            case 4:

                  days = '星期四';

                  break;

            case 5:

                  days = '星期五';

                  break;

            case 6:

                  days = '星期六';

                  break;

            case 0:

                  days = '星期日';

                  break;



      }

      var str = month + "月" + day + "日  " + " " + days;
      return str;
}


const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
}

const formatText = n => {
      if (n.length >= 8) {
            n = n.substring(0, 8) + "...";
      }
      return n;
}

const formatMessage = (n, length) => {
      if (n != null && n.length >= length) {
            n = n.substring(0, length) + " ...";
      }
      return n;
}

module.exports = {
      formatTime: formatTime,
      formatTime1: formatTime1,
      forTimeStamp: forTimeStamp,
      formatDate: formatDate,
      formatText: formatText,
      forTimeStampToWeek: forTimeStampToWeek,
      formatDateByLine: formatDateByLine,
      formatMessage: formatMessage
}