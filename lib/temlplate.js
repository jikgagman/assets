module.exports = {
    HTML: function(title, description, totalNum, refNum, safeNum, unknownNum, form){
        return `
        <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>오송역 유실물 관리 시스템</title>
        <link href="imgs/logo.png" rel="shortcut icon" type="image/x-icon">
        <!-- ======= Styles ====== -->
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    </head>  
    
    <body>
        <!-- =============== Navigation ================ -->
        <div class="container">
            <div class="navigation">
                <ul>
                    <li>
                        <a href="/">
                            <span class="icon">
                                <span class="material-symbols-outlined">travel_explore</span>
                            </span>
                            <span class="title">오송역 유실물</span>
                        </a>
                    </li>
    
                    <li>
                        <a href="/?id=보관중">
                            <span class="icon">
                                <span class="material-symbols-outlined">package_2</span>
                            </span>
                            <span class="title">보관중</span>
                        </a>
                    </li>
    
                    <li>
                        <a href="/?id=본인인도">
                            <span class="icon">
                                <span class="material-symbols-outlined">approval_delegation</span>
                            </span>
                            <span class="title">본인인도</span>
                        </a>
                    </li>
    
                    <li>
                        <a href="/?id=타역이관">
                            <span class="icon">
                                <span class="material-symbols-outlined">train</span>
                            </span>
                            <span class="title">타역 이관</span>
                        </a>
                    </li>
    
                    <li>
                        <a href="/?id=경찰서이관">
                            <span class="icon">
                                <span class="material-symbols-outlined">local_police</span>
                            </span>
                            <span class="title">경찰서 이관</span>
                        </a>
                    </li>
    
                    <li>
                        <a href="/?id=삭제">
                            <span class="icon">
                                <span class="material-symbols-outlined">delete</span>
                            </span>
                            <span class="title">삭제</span>
                        </a>
                    </li>
    
                </ul>
            </div>
    
            <!-- ========================= Main ==================== -->
            <div class="main">
                <div class="topbar">
                    <div class="toggle">
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>
    
                    <div class="search">
                        <label>
                            <input type="text" placeholder="Search here">
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>
    
                    <div class="user">
                        <img src="imgs/customer01.jpg" alt="">
                    </div>
                </div>
    
                <!-- ======================= Cards ================== -->
                <div class="cardBox">
                    <div class="card">
                        <div>
                            <div class="numbers">${totalNum}</div>
                            <div class="cardName">총</div>
                        </div>
    
                        <div class="iconBxTotal">
                            <span class="material-symbols-outlined" style="font-size: 50px;">analytics</span>
                        </div>
                    </div>
    
                    <div class="card">
                        <div>
                            <div class="numbers">${refNum}</div>
                            <div class="cardName">냉장</div>
                        </div>
    
                        <div class="iconBxKitchen">
                            <span class="material-symbols-outlined" style="font-size: 50px;">kitchen</span>
                        </div>
                    </div>
    
                    <div class="card">
                        <div>
                            <div class="numbers">${safeNum}</div>
                            <div class="cardName">금고</div>
                        </div>
    
                        <div class="iconBxLock">
                            <span class="material-symbols-outlined" style="font-size: 50px;">lock</span>
                        </div>
                    </div>
    
                    <div class="card">
                        <div>
                            <div class="numbers">${unknownNum}</div>
                            <div class="cardName">미상</div>
                        </div>
    
                        <div class="iconBxUnknown">
                            <span class="material-symbols-outlined" style="font-size: 50px;">question_mark</span>
                        </div>
                    </div>
                </div>
    
                <!-- ================ Order Details List ================= -->
                <div class="details">
                    <div class="listOfLosts">
                        <div class="cardHeader">
                            <h2><span class="material-symbols-outlined">package_2</span> ${title}</h2>
                        </div>
                        <div class="inStorage_table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>날짜</th>
                                        <th>등록자</th>
                                        <th>습득 장소</th>
                                        <th>유실물</th>
                                        <th>이름</th>
                                        <th>번호</th>
                                        <th>보관함</th>
                                        <th>처리</th>
                                    </tr>
                                </thead>
                                
                                ${description}
                            </table>
                        </div>
                        
                    </div>
    
                    <!-- ================= New Customers ================ -->
                    <div class="addLostsSection">
                        <div class="cardHeader">
                            <h2>유실물 등록</h2>
                        </div>
                        <div class="add">
                            ${form}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- =========== Scripts =========  -->
        <script src="main.js"></script>
        <script src="index.js"></script>
        <!-- ====== ionicons ======= -->
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </body>
    
    </html>
        `;
    },list: function(instorages){
        var list = '<tbody>';
        var i = 0;
        while(i < instorages.length){
            list = list + `<tr>`;
            list = list + `<td>${instorages[i].date}</td>`;
            list = list + `<td>${instorages[i].registant}</td>`;
            list = list + `<td>${instorages[i].place}</td>`;
            list = list + `<td>${instorages[i].title}</td>`;
            list = list + `<td>${instorages[i].name}</td>` ;
            list = list + `<td>${instorages[i].hp}</td>`;
            list = list + `<td>${instorages[i].storage}</td>`;
            list = list + `<td><a style="text-decoration-line: none;" href="update?id=${instorages[i].id}">update</a>
                            <form action="delete_process" method="post">
                                <input type="hidden" name="id" value="${instorages[i].id}">
                                <input type="submit" value="delete">
                            </form>
                            <form action="receipt_process" method="post">
                                <input type="hidden" name="id" value="${instorages[i].id}">
                                <input type="submit" value="receipt">
                            </form>
                            <form action="ttas_process" method="post">
                                <input type="hidden" name="id" value="${instorages[i].id}">
                                <input type="submit" value="ttas">
                            </form>
                            <form action="police_process" method="post">
                                <input type="hidden" name="id" value="${instorages[i].id}">
                                <input type="submit" value="police">
                            </form>
                            </td>`;
            list = list + `</tr>`; 
            i = i + 1;
        }
        list = list + '</tbody>';
        return list;
    }
}