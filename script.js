document.addEventListener("DOMContentLoaded", function () {
    const ladiesPriceList = document.getElementById("ladies-price-list");
    const mensPriceList = document.getElementById("mens-price-list");

    // メニューリスト
    const ladiesMenuItems = [
        { name: "かかと", price: "1,500 yen~", category: "ladies-general" },
        { name: "ソール", price: "2,300 yen~", category: "ladies-general" },
        { name: "つま先", price: "1,500 yen~", category: "ladies-general" },
        { name: "中敷き", price: "1,350 yen~", category: "ladies-general" },
        { name: "ストレッチ", price: "800 yen~", category: "ladies-general" },
        { name: "ミガキ", price: "1,500 yen~", category: "ladies-general" },
        { name: "ピンリフト", price: "1,500 yen~", category: "ladies-heel" },
        { name: "ウレタン", price: "1,500 yen~", category: "ladies-heel" },
        { name: "ラバー", price: "1,500 yen~", category: "ladies-heel" },
        { name: "ヒール巻直し", price: "5,000 yen~", category: "ladies-heel" },
        { name: "ヒール交換", price: "5,500 yen~", category: "ladies-heel" },
        { name: "ラバー", price: "2,300 yen~", category: "ladies-sole" },
        { name: "レザー", price: "4,500 yen~", category: "ladies-sole" },
        { name: "ラバー", price: "1,500 yen~", category: "ladies-toe-repair" },
        { name: "レザー", price: "1,500 yen~", category: "ladies-toe-repair" },
        { name: "サイズ詰め", price: "1,000 yen~", category: "ladies-size" },
        { name: "ストレッチ", price: "800 yen~", category: "ladies-size" },
        { name: "ブーツ筒伸ばし", price: "1,500 yen~", category: "ladies-size" }
    ];
    
    const mensMenuItems = [
        { name: "かかと", price: "2,500 yen~", category: "mens-general" },
        { name: "ソール", price: "2,500 yen~", category: "mens-general" },
        { name: "つま先", price: "1,500 yen~", category: "mens-general" },
        { name: "中敷き", price: "1,500 yen~", category: "mens-general" },
        { name: "ストレッチ", price: "900 yen~", category: "mens-general" },
        { name: "ミガキ", price: "1,500 yen~", category: "mens-general" },
        { name: "ラバー", price: "2,500 yen~", category: "mens-heel" },
        { name: "ラスター", price: "2,500 yen~", category: "mens-heel" },
        { name: "ダイナイト", price: "2,500 yen~", category: "mens-heel" },
        { name: "ラバー", price: "2,500 yen~", category: "mens-half-sole" },
        { name: "レザー", price: "6,600 yen~", category: "mens-half-sole" },
        { name: "ラバー", price: "1,500 yen~", category: "mens-toe-repair" },
        { name: "レザー", price: "1,500 yen~", category: "mens-toe-repair" },
        { name: "スチール", price: "3,300 yen~", category: "mens-toe-repair" },
        { name: "ラバー", price: "9,000 yen~", category: "mens-all-sole" },
        { name: "レザー", price: "15,400 yen~", category: "mens-all-sole" },
        { name: "ダイナイト", price: "14,300 yen~", category: "mens-all-sole" },
    ];

    // メニューを動的に追加
    function addMenuItems(menuItems, priceList) {
        menuItems.forEach(item => {
            const priceCard = document.createElement("div");
            priceCard.classList.add("price-card");
            priceCard.setAttribute("data-category", item.category);
            priceCard.setAttribute("data-original-name", item.name); // 元の名前を保存

            priceCard.innerHTML = `
                <span class="item">${item.name}</span>
                <span class="price">${item.price}</span>
            `;

            priceList.appendChild(priceCard);
        });
    }

    addMenuItems(ladiesMenuItems, ladiesPriceList);
    addMenuItems(mensMenuItems, mensPriceList);

    // カテゴリ名を取得する関数
    function getCategoryLabel(category) {
        const categoryLabels = {
            "ladies-general": "一般",
            "ladies-heel": "ヒール",
            "ladies-sole": "ソール",
            "ladies-toe-repair": "つま先補修",
            "ladies-size": "サイズ調整",
            "mens-general": "一般",
            "mens-heel": "ヒール",
            "mens-half-sole": "ハーフソール",
            "mens-toe-repair": "つま先補修",
            "mens-all-sole": "オールソール"
        };
        return categoryLabels[category] || "その他";
    }

    // フィルタリング関数（レディースとメンズを独立して制御）
    window.filterPrices = function (category, type) {
        const priceList = type === "ladies" ? ladiesPriceList : mensPriceList;
        const items = priceList.querySelectorAll(".price-card");

        items.forEach(item => {
            const itemCategory = item.getAttribute("data-category");
            const originalName = item.getAttribute("data-original-name"); // 元の名前を取得

            if (category === type + "-all") {
                // すべてを選択 → カテゴリ名をカッコで追加
                const categoryName = getCategoryLabel(itemCategory);
                item.querySelector(".item").textContent = `${originalName}（${categoryName}）`;
                item.style.display = "block";
            } else if (itemCategory === category) {
                // 指定カテゴリのみ表示 & カッコを削除
                item.querySelector(".item").textContent = originalName;
                item.style.display = "block";
            } else {
                // 他のカテゴリは非表示
                item.style.display = "none";
            }
        });

        // ボタンのアクティブ状態を変更（レディース・メンズごとに制御）
        const buttonGroup = document.querySelectorAll(`.tab-button[data-type="${type}"]`);
        buttonGroup.forEach(btn => btn.classList.remove("active"));
        document.querySelector(`[onclick="filterPrices('${category}', '${type}')"]`).classList.add("active");
    };
    