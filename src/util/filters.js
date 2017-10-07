export const aaa = 1;
export const level = (likes) => {
  if (likes < 2000) {
    return '倔强青铜';
  } else if (likes < 6000) {
    return '秩序白银';
  } else if (likes < 12000) {
    return '荣耀黄金';
  } else if (likes < 20000) {
    return '尊贵铂金';
  } else if (likes < 30000) {
    return '永恒钻石';
  }
  return '最强王者';
};
