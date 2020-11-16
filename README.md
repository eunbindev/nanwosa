# 공동 구매 중개 서비스 <나눠사>
[사이트](http://www.nanwosa.ga/) / [시연영상](https://youtu.be/KAFy8YOo1Lw)

### 프로젝트 소개

> 대학 자취 시절,   
> 대량으로 구매하면 저렴하지만 혼자 소비할 수 없는 양 때문에 더 비싼 소분 상품을 구매하곤 했습니다.  
> 
> 이를 극복하기 위해 학교 커뮤니티에서 사람들과 공동구매를 하기도 했는데,   
함께 구매할 사람을 모집하고 금액을 받는 일련의 과정이 매우 번거롭게 느껴졌습니다.  
> 
> 나눠사는 이러한 저의 과거 경험을 바탕으로 개발한 **공동 구매 중개 서비스** 입니다.  
> 
> 1개는 비싸고, 10개는 너무 많지 않나요?  
> 함께 구매할 사람을 구해 더욱 저렴하게 구매해보세요!  

### 주요 기능

> - 상품 등록, 수정, 삭제, 검색 기능 (사진 업로드 가능)
> - 직거래, 택배거래 시나리오 별 거래 관리 기능
> - 예치금 정산 기능

### 스택 아키텍쳐

![7조_나눠사_7 (1)](https://user-images.githubusercontent.com/53418160/99229536-808a7c00-2831-11eb-8a26-263cdea12be4.png)

# Backend
**Django Rest Framework를 활용한 회원, 게시물, 주문, 정산 CRUD 가능한 REST API**

### End-points
**api 문서는 swagger 를 통해 자동화**

> - user
> 
> |HTTP|Path|Method|목적|
> |---|---|---|---|
> |POST|/rest-auth/registration/|Create|user 생성|
> |POST|/rest-auth/login/|Read|user 조회|
>
> - post
>
> |HTTP|Path|Method|목적|
> |---|---|---|---|
> |POST|/post/create/|Create|post 생성|
> |GET|/post/|List|모든 post 조회|
> |GET|/post/search/|List|특정 post 조회|
> |PUT|/post/{id}/update|Update|post 수정|
> |DELETE|/post/{id}/delete|Delete|post 삭제|
> 
> - buy
> 
> |HTTP|Path|Method|목적|
> |---|---|---|---|
> |POST|/buy/create/|Create|buy 생성|
> |GET|/buy|List|모든 buy 조회|
> |GET|/buy/{id}/|List|특정 buy 조회|
> |PUT|/buy/update/{id}|Update|buy 수정|
> 
> - cash
> 
> |HTTP|Path|Method|목적|
> |---|---|---|---|
> |POST|/cash/create/|Create|cash 생성|
> |GET|/cash/|List|모든 cash 조회|

### Models
![ERD](https://user-images.githubusercontent.com/53418160/99230169-55545c80-2832-11eb-8783-240a36f81fea.png)

# Frontend
**React UI 라이브러리 Material-UI를 활용한 컴포넌트 기반 반응형 웹 레이아웃**

### Redux
![7조_나눠사-10](https://user-images.githubusercontent.com/53418160/99241060-aec38800-2840-11eb-821a-4e7a9aa7769c.png)

> - 게시물에서 주문으로 페이지가 이동하는 과정에서 사용
> - URL 쿼리를 이용해 받아오던 게시물 정보를 리덕스를 통해 전역적으로 관리하는 것으로 개선

# Etc

### 향후 추가 기능
**실 서비스를 목표로 개선 예정**

> - 지역 기반의 거래
> - 사용자 간의 채팅
> - ...and more!
