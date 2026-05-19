// 遊戲工具函數
class Utils {
    // 計算兩點之間的距離
    static getDistance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // 計算兩點之間的角度
    static getAngle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    // 角度轉弧度
    static degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

    // 弧度轉角度
    static radToDeg(radians) {
        return radians * 180 / Math.PI;
    }

    // 隨機數生成
    static random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // 隨機整數生成
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 圓形碰撞檢測
    static circleCollision(obj1, obj2) {
        const distance = this.getDistance(obj1.x, obj1.y, obj2.x, obj2.y);
        return distance < (obj1.radius + obj2.radius);
    }

    // 矩形碰撞檢測
    static rectCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    // 限制數值範圍
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    // 線性插值
    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // 緩動函數
    static easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // 創建DOM元素
    static createElement(tag, className, parent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (parent) parent.appendChild(element);
        return element;
    }

    // 移除DOM元素
    static removeElement(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    // 格式化數字（添加千分位逗號）
    static formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 創建粒子效果 - 性能優化版
    static createParticles(x, y, count, color) {
        // 限制粒子數量，減少性能消耗
        const maxParticles = Math.min(count, 8);
        const particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push({
                x: x,
                y: y,
                vx: this.random(-2, 2),
                vy: this.random(-2, 2),
                life: 1,
                decay: this.random(0.04, 0.08), // 更快消失
                color: color || '#FFD700',
                size: this.random(2, 4)
            });
        }
        return particles;
    }

    // 更新粒子效果
    static updateParticles(particles) {
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // 重力效果
            particle.life -= particle.decay;
            
            if (particle.life <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    // 繪製粒子效果
    static drawParticles(ctx, particles) {
        particles.forEach(particle => {
            ctx.save();
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    // 創建波紋效果
    static createRipple(x, y) {
        const ripple = this.createElement('div', 'ripple-effect');
        ripple.style.left = (x - 25) + 'px';
        ripple.style.top = (y - 25) + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        document.getElementById('gameArea').appendChild(ripple);
        
        setTimeout(() => {
            this.removeElement(ripple);
        }, 600);
    }

    // 創建爆炸效果
    static createExplosion(x, y) {
        const explosion = this.createElement('div', 'explosion-effect');
        explosion.style.left = (x - 50) + 'px';
        explosion.style.top = (y - 50) + 'px';
        document.getElementById('gameArea').appendChild(explosion);
        
        setTimeout(() => {
            this.removeElement(explosion);
        }, 500);
    }

    // 創建分數浮動效果
    static createScoreFloat(x, y, score) {
        const scoreFloat = this.createElement('div', 'score-float');
        scoreFloat.textContent = '+' + score;
        scoreFloat.style.left = x + 'px';
        scoreFloat.style.top = y + 'px';
        document.getElementById('gameArea').appendChild(scoreFloat);
        
        setTimeout(() => {
            this.removeElement(scoreFloat);
        }, 1000);
    }

    // 播放音效（如果有音頻文件）
    static playSound(soundName, volume = 0.5) {
        // 這裡可以擴展音效功能
        // 由於沒有音頻文件，暫時使用console.log
        console.log(`播放音效: ${soundName}`);
    }

    // 震動效果（移動設備）
    static vibrate(duration = 100) {
        if (navigator.vibrate) {
            navigator.vibrate(duration);
        }
    }

    // 創建冰凍效果
    static createIceEffect() {
        const iceOverlay = this.createElement('div', 'ice-effect');
        iceOverlay.style.position = 'fixed';
        iceOverlay.style.top = '0';
        iceOverlay.style.left = '0';
        iceOverlay.style.width = '100%';
        iceOverlay.style.height = '100%';
        iceOverlay.style.background = 'radial-gradient(circle, rgba(135,206,235,0.3) 0%, rgba(173,216,230,0.1) 100%)';
        iceOverlay.style.pointerEvents = 'none';
        iceOverlay.style.zIndex = '100';
        document.body.appendChild(iceOverlay);
        
        setTimeout(() => {
            this.removeElement(iceOverlay);
        }, 5000);
    }
    
    // 創建雷射效果
    static createLaserEffect(startX, startY, endX, endY) {
        const laser = this.createElement('div', 'laser-effect');
        laser.style.position = 'absolute';
        laser.style.left = startX + 'px';
        laser.style.top = (startY - 25) + 'px';
        laser.style.width = (endX - startX) + 'px';
        laser.style.height = '50px';
        laser.style.background = 'linear-gradient(90deg, transparent, #FF0000, #FFFF00, #FF0000, transparent)';
        laser.style.boxShadow = '0 0 20px #FF0000';
        laser.style.animation = 'laser-pulse 0.5s ease-in-out';
        laser.style.zIndex = '90';
        document.getElementById('gameArea').appendChild(laser);
        
        setTimeout(() => {
            this.removeElement(laser);
        }, 500);
    }
    
    // 創建捕魚網效果
    static createNetEffect(centerX, centerY, radius) {
        const net = this.createElement('div', 'net-effect');
        net.style.position = 'absolute';
        net.style.left = (centerX - radius) + 'px';
        net.style.top = (centerY - radius) + 'px';
        net.style.width = (radius * 2) + 'px';
        net.style.height = (radius * 2) + 'px';
        net.style.border = '3px solid #8B4513';
        net.style.borderRadius = '50%';
        net.style.background = 'radial-gradient(circle, rgba(139,69,19,0.2) 0%, rgba(139,69,19,0.1) 100%)';
        net.style.animation = 'net-expand 1s ease-out';
        net.style.zIndex = '85';
        
        // 添加網格效果
        for (let i = 0; i < 8; i++) {
            const line = this.createElement('div');
            line.style.position = 'absolute';
            line.style.width = '100%';
            line.style.height = '2px';
            line.style.background = '#8B4513';
            line.style.top = (i * radius / 4) + 'px';
            line.style.left = '0';
            line.style.transform = `rotate(${i * 22.5}deg)`;
            line.style.transformOrigin = 'center';
            net.appendChild(line);
        }
        
        document.getElementById('gameArea').appendChild(net);
        
        setTimeout(() => {
            this.removeElement(net);
        }, 1000);
    }

    // 創建連鎖反應效果 - 性能優化版，支援連續電擊
    static createChainLightning(startX, startY, endX, endY, intensity = 1, chainLevel = 0, isContinuous = false) {
        // 為連續電擊創建更細膩的閃電效果
        const lightningClass = isContinuous ? 'chain-lightning continuous-lightning' : 'chain-lightning';
        const lightning = this.createElement('div', lightningClass);
        lightning.style.position = 'absolute';
        lightning.style.left = '0px';
        lightning.style.top = '0px';
        lightning.style.width = '100%';
        lightning.style.height = '100%';
        lightning.style.pointerEvents = 'none';
        lightning.style.zIndex = '80';
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.top = '0';
        svg.style.left = '0';
        
        // 連續電擊使用更多分支
        const branchCount = isContinuous ? 2 : 1;
        
        for (let branch = 0; branch < branchCount; branch++) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            
            // 為連續電擊增加更多變化
            const segments = isContinuous ? Math.min(12, 8 + chainLevel) : Math.min(8, 6 + chainLevel);
            let pathData = `M ${startX} ${startY}`;
            
            for (let i = 1; i < segments; i++) {
                const progress = i / segments;
                const baseDeviation = isContinuous ? 25 : 15;
                const deviation = Math.min(30, baseDeviation + chainLevel * 3);
                const branchOffset = branch * 10; // 分支偏移
                
                const x = startX + (endX - startX) * progress + 
                         Utils.random(-deviation, deviation) + 
                         (branch > 0 ? branchOffset : 0);
                const y = startY + (endY - startY) * progress + 
                         Utils.random(-deviation, deviation);
                pathData += ` L ${x} ${y}`;
            }
            pathData += ` L ${endX + (branch > 0 ? Utils.random(-10, 10) : 0)} ${endY}`;
            
            path.setAttribute('d', pathData);
            
            // 連續電擊使用不同顏色和強度
            if (isContinuous) {
                const colors = ['#00FFFF', '#FFFFFF', '#87CEEB'];
                path.setAttribute('stroke', colors[branch % colors.length]);
                path.setAttribute('stroke-width', (2 + branch) * intensity);
                path.setAttribute('opacity', (0.6 - branch * 0.2) * intensity);
            } else {
                path.setAttribute('stroke', '#00FFFF');
                path.setAttribute('stroke-width', Math.min(8, 3 + chainLevel) * intensity);
                path.setAttribute('opacity', 0.8 * intensity);
            }
            
            path.setAttribute('fill', 'none');
            
            // 發光效果
            const glowIntensity = Math.min(15, 8 + chainLevel * 2) * intensity;
            path.style.filter = `drop-shadow(0 0 ${glowIntensity}px #00FFFF)`;
            
            svg.appendChild(path);
        }
        
        lightning.appendChild(svg);
        document.getElementById('gameArea').appendChild(lightning);
        
        // 連續電擊的持續時間極短，創造連續效果
        const duration = isContinuous ? 
            Math.min(80, 50 + chainLevel * 5) : 
            Math.min(300, 150 + chainLevel * 20);
            
        setTimeout(() => {
            this.removeElement(lightning);
        }, duration);
        
        return lightning;
    }

    // 創建電火花效果 - 性能優化版
    static createElectricSpark(x, y, intensity, chainLevel) {
        // 大幅減少電火花數量和複雜度
        const sparkCount = Math.min(3, 2 + Math.floor(chainLevel / 2));
        
        for (let i = 0; i < sparkCount; i++) {
            const spark = this.createElement('div', 'electric-spark');
            spark.style.position = 'absolute';
            spark.style.left = (x - 3) + 'px';
            spark.style.top = (y - 3) + 'px';
            spark.style.width = '6px';
            spark.style.height = '6px';
            spark.style.background = '#00FFFF';
            spark.style.borderRadius = '50%';
            spark.style.pointerEvents = 'none';
            spark.style.zIndex = '85';
            spark.style.opacity = intensity.toString();
            
            document.getElementById('gameArea').appendChild(spark);
            
            // 縮短存在時間
            setTimeout(() => {
                this.removeElement(spark);
            }, 150);
        }
    }

    // 計算連鎖反應目標
    static findChainTargets(centerX, centerY, fishes, range, maxCount, excludeIds = []) {
        const targets = [];
        
        fishes.forEach(fish => {
            if (fish.isDead || excludeIds.includes(fish.id)) return;
            
            const distance = this.getDistance(centerX, centerY, fish.x, fish.y);
            if (distance <= range) {
                targets.push({
                    fish: fish,
                    distance: distance
                });
            }
        });
        
        // 按距離排序，選擇最近的目標
        targets.sort((a, b) => a.distance - b.distance);
        return targets.slice(0, maxCount).map(t => t.fish);
    }
}

// 生成素材載入器：背景圖直接使用，魚圖在瀏覽器端去除綠幕。
class GameAssets {
    static background = null;
    static fishSheet = null;
    static fishSheetReady = false;
    static backgroundReady = false;
    static started = false;

    static load() {
        if (this.started) return;
        this.started = true;

        this.background = new Image();
        this.background.onload = () => {
            this.backgroundReady = true;
        };
        this.background.src = 'assets/images/ocean-background.png';

        const sourceFishSheet = new Image();
        sourceFishSheet.onload = () => {
            this.fishSheet = this.removeGreenScreen(sourceFishSheet);
            this.fishSheetReady = true;
        };
        sourceFishSheet.src = 'assets/images/fish-sprites-source.png';
    }

    static removeGreenScreen(image) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const greenDominance = g - Math.max(r, b);
            if (g > 120 && greenDominance > 32) {
                const alpha = Utils.clamp(255 - (greenDominance - 20) * 7, 0, 255);
                data[i + 3] = Math.min(data[i + 3], alpha);
                if (alpha < 90) {
                    data[i] = 0;
                    data[i + 1] = 0;
                    data[i + 2] = 0;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }

    static drawBackground(ctx, canvas) {
        if (!this.backgroundReady) return false;

        const imageRatio = this.background.width / this.background.height;
        const canvasRatio = canvas.width / canvas.height;
        let sx = 0;
        let sy = 0;
        let sw = this.background.width;
        let sh = this.background.height;

        if (imageRatio > canvasRatio) {
            sw = this.background.height * canvasRatio;
            sx = (this.background.width - sw) / 2;
        } else {
            sh = this.background.width / canvasRatio;
            sy = (this.background.height - sh) / 2;
        }

        ctx.drawImage(this.background, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        return true;
    }

    static getFishSpriteIndex(fishType) {
        const spriteMap = [0, 1, 2, 6, 7, 3, 4, 5, 7, 7];
        return spriteMap[fishType] ?? 0;
    }

    static drawFish(ctx, fish) {
        if (!this.fishSheetReady || !this.fishSheet) return false;

        const index = this.getFishSpriteIndex(fish.type);
        const cols = 4;
        const rows = 2;
        const cellW = this.fishSheet.width / cols;
        const cellH = this.fishSheet.height / rows;
        const sx = (index % cols) * cellW;
        const sy = Math.floor(index / cols) * cellH;

        const drawW = fish.radius * (fish.type >= 8 ? 3.15 : fish.type >= 3 ? 2.9 : 2.75);
        const drawH = drawW * (cellH / cellW);

        ctx.save();
        ctx.shadowColor = fish.special ? fish.color : 'rgba(255, 255, 255, 0.55)';
        ctx.shadowBlur = fish.special ? 20 : 9;
        ctx.drawImage(this.fishSheet, sx, sy, cellW, cellH, -drawW * 0.5, -drawH * 0.5, drawW, drawH);
        ctx.restore();

        return true;
    }
}

// 遊戲配置
const GAME_CONFIG = {
    // 基礎設置
    INITIAL_SCORE: 10000,
    MAX_FISH_COUNT: 30,
    MIN_FISH_COUNT: 10,
    
    // 賭注系統
    BET_SYSTEM: {
        INITIAL_COINS: 1000,
        DEFAULT_BET: 5,
        MIN_BET: 1,
        MAX_BET: 1000,
        BET_OPTIONS: [1, 2, 5, 10, 20, 50, 100, 200, 300, 500, 1000]
    },

    // 雷射改成必中後，需要比傳統子彈低一點，避免魚被瞬間清場
    LASER_BALANCE: {
        MANUAL_DAMAGE_SCALE: 0.35,
        AUTO_DAMAGE_SCALE: 0.22,
        MIN_DAMAGE: 1
    },
    
    // 魚類配置 - 擴展更多魚種（移除小丑魚以增加遊戲難度）
    FISH_TYPES: [
        { name: '金魚', size: 20, speed: 1.2, color: '#FFD700', score: 5, health: 4, catchRate: 0.8 },
        { name: '熱帶魚', size: 25, speed: 1.0, color: '#00CED1', score: 10, health: 7, catchRate: 0.7 },
        { name: '比目魚', size: 30, speed: 0.8, color: '#8B4513', score: 20, health: 14, catchRate: 0.6 },
        { name: '鯊魚', size: 50, speed: 0.6, color: '#708090', score: 50, health: 32, catchRate: 0.4 },
        { name: '鯨魚', size: 80, speed: 0.4, color: '#2F4F4F', score: 100, health: 70, catchRate: 0.3 },
        // 新增特殊魚種
        { name: '爆炸魚', size: 35, speed: 1.0, color: '#FF4500', score: 30, health: 22, catchRate: 0.5, special: 'explosion' },
        { name: '冰凍魚', size: 40, speed: 0.7, color: '#87CEEB', score: 40, health: 30, catchRate: 0.4, special: 'freeze' },
        { name: '倍數魚', size: 45, speed: 0.5, color: '#9370DB', score: 60, health: 45, catchRate: 0.3, special: 'multiplier' },
        { name: '龍王', size: 100, speed: 0.3, color: '#DC143C', score: 200, health: 130, catchRate: 0.2, special: 'boss' },
        { name: '黃金龍', size: 120, speed: 0.2, color: '#FFD700', score: 500, health: 280, catchRate: 0.1, special: 'jackpot' }
    ],
    
    // 炮台等級配置
    CANNON_LEVELS: [
        { level: 0, power: 5, cost: 1, color: '#87CEEB', name: '初級炮' },
        { level: 1, power: 10, cost: 2, color: '#4682B4', name: '中級炮' },
        { level: 2, power: 20, cost: 5, color: '#1E90FF', name: '高級炮' },
        { level: 3, power: 40, cost: 10, color: '#0000FF', name: '精英炮' },
        { level: 4, power: 80, cost: 20, color: '#4B0082', name: '傳說炮' },
        { level: 5, power: 150, cost: 50, color: '#8B008B', name: '神話炮' }
    ],
    
    // 特殊技能系統
    SPECIAL_SKILLS: {
        FREEZE: {
            name: '冰凍技能',
            cost: 50,
            duration: 5000, // 5秒
            cooldown: 30000, // 30秒冷卻
            description: '暫停所有魚的移動'
        },
        BOMB: {
            name: '爆彈技能',
            cost: 100,
            radius: 150,
            cooldown: 45000,
            description: '範圍爆炸攻擊'
        },
        LASER: {
            name: '雷射大砲',
            cost: 200,
            duration: 3000,
            cooldown: 60000,
            description: '蓄力雷射橫掃'
        },
        NET: {
            name: '捕魚網',
            cost: 150,
            radius: 200,
            cooldown: 50000,
            description: '大範圍捕魚'
        }
    },
    
    // 道具系統
    ITEMS: {
        DOUBLE_SCORE: {
            name: '雙倍得分',
            cost: 80,
            duration: 15000,
            description: '15秒內得分翻倍'
        },
        LUCKY_SHOT: {
            name: '幸運一擊',
            cost: 120,
            uses: 5,
            description: '提高捕獲率到90%'
        },
        RAPID_FIRE: {
            name: '連發模式',
            cost: 60,
            duration: 10000,
            description: '10秒內射速翻倍'
        }
    },
    
    // BOSS系統
    BOSS_SYSTEM: {
        SPAWN_INTERVAL: 180000, // 3分鐘
        BOSS_TYPES: [
            {
                name: '海妖王',
                health: 500,
                score: 1000,
                size: 150,
                speed: 0.3,
                color: '#8B0000',
                attacks: ['tentacle', 'whirlpool']
            },
            {
                name: '深海霸主',
                health: 800,
                score: 2000,
                size: 200,
                speed: 0.2,
                color: '#000080',
                attacks: ['laser', 'summon']
            }
        ]
    },
    
    // 彩金系統
    JACKPOT_SYSTEM: {
        BASE_AMOUNT: 10000,
        ACCUMULATION_RATE: 0.01, // 每次射擊的1%進入獎池
        WIN_PROBABILITY: 0.001, // 0.1%中獎機率
        MULTIPLIERS: [1, 2, 5, 10, 50, 100] // 彩金倍數
    },
    
    // 任務系統
    MISSIONS: [
        {
            id: 'catch_fish_10',
            name: '捕魚新手',
            description: '捕獲10條魚',
            target: 10,
            reward: 100,
            type: 'catch_count'
        },
        {
            id: 'score_1000',
            name: '得分達人',
            description: '單局得分達到1000',
            target: 1000,
            reward: 200,
            type: 'score'
        },
        {
            id: 'combo_5',
            name: '連擊高手',
            description: '達成5連擊',
            target: 5,
            reward: 150,
            type: 'combo'
        }
    ],
    
    // 成就系統
    ACHIEVEMENTS: [
        {
            id: 'first_boss',
            name: 'BOSS獵人',
            description: '擊敗第一個BOSS',
            reward: 500,
            icon: '👑'
        },
        {
            id: 'jackpot_winner',
            name: '彩金幸運兒',
            description: '獲得彩金獎勵',
            reward: 1000,
            icon: '💰'
        },
        {
            id: 'master_fisher',
            name: '捕魚大師',
            description: '捕獲100條魚',
            reward: 2000,
            icon: '🎣'
        }
    ],
    
    // 閃電系統配置
    AUTO_LIGHTNING_MODE: false,
    CONTINUOUS_LIGHTNING: true,
    LOCK_TARGET_UNTIL_DEAD: true,
    MAX_CONTINUOUS_TARGETS: 2,
    LIGHTNING_FIRE_RATE: 8,
    LIGHTNING_DURATION: 2000,
    LIGHTNING_TARGET_COUNT: 3,
    LIGHTNING_CHAIN_RANGE: 100,

    // 連鎖反應配置
    MAX_CHAIN_COUNT: 4,
    CHAIN_REACTION_RANGE: 120,
    CHAIN_DAMAGE_DECAY: 0.55
};

// 調試信息（已移除） 
