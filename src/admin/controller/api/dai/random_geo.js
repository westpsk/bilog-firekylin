const Base = require('../base');
const jiangsu = require('./jiang_su_geo.json')


module.exports = class extends Base {
  constructor(...args) {
    super(...args);
  }

  async __before() {
    await super.__before();
  }

  // 导出其他平台数据
  async getAction() {
    const radom = this.get('num') || 30
    const pois = []
    const result = []
    const phonePre = [
      '139', '138', '137', '136', '135', '134', '159', '158', '157', '150',
      '151', '152', '188', '187', '182', '183', '184', '178', '130', '131',
      '132', '156', '155', '186', '185', '176', '133', '153', '189', '180',
      '181', '177']
    jiangsu.features.map(feature => {
      pois.push(...feature.geometry.coordinates[0])
    })
    const getRandomNums = (radom) => {
      let nums = []
      while(nums.length < radom) {
        const num = genInt(0, pois.length)
        if(!~nums.indexOf(num)) {
          nums.push(num)
        }
      }
      return nums
    }
    const genInt = (min, max) => {
      return Math.floor(Math.random()*max) + min
    }
    const nums = getRandomNums(radom)
    nums.forEach((num, index) => {
      result.push({
        id: (index + 1).toString(),
        name: `${phonePre[genInt(0, phonePre.length)]}${genInt(1, 10e7)}`,
        x: pois[num][1].toString(),
        y: pois[num][0].toString(),
        color: '#00b0f0',
        province: '江苏',
        type_id: 1
      })
    })
    console.log(result)

    return this.success(result);
  }
}
