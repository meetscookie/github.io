const options = {
	'Base':{
		'text':'オーダー種別',
		'options':{
			'none':{
				'text':'選択してください',
				'disables':[
					'Size', 'SNS', 'btn_copy', 'btn_mail'
				],
				'image':'sentaku.png'
			},
			'complex_adjust':{
				'text':'複雑イラスト 調整必要',
				'price':12000,
				'disables':[
				],
				'image':'fukuzatu.png'
			},
			'simple_adjust':{
				'text':'シンプルイラスト 調整必要',
				'price':7300,
				'disables':[
				],
				'image':'shinpuru.png'
			},
			'no_adjust':{
				'text':'イラスト調整なし(1/1線幅1mm)）',
				'price':6100,
				'disables':[
				],
				'image':'jpegpdf.png'
			},
			'ai_data':{
				'text':'データ入稿(Adobe Illustrator形式のみ、1/1線幅1mm)',
				'price':5000,
				'disables':[
				],
				'image':'illustrator.png'
			},
			'multi_illust':{
				'text':'イラスト複数',
				'price':'価格要相談',
				'disables':[
				],
				'image':'fukusuu.png'
			},
			'many':{
				'text':'量産',
				'price':'価格要相談',
				'disables':[
				],
				'image':'ryousan.png'
			}
		},
		'default':'none'
	},
	'Size':{
		'text':'サイズ',
		'options':{
			'none':{
				'text':'選択してください',
				'disables':[
					'SNS', 'btn_copy', 'btn_mail'
				]
			},
			'S':{
				'text':'~6cm',
				'price':700,
				'disables':[
				]
			},
			'M':{
				'text':'7~8cm',
				'price':1100,
				'disables':[
				]
			},
			'L':{
				'text':'9~10cm',
				'price':1500,
				'disables':[
				]
			},
			'XL':{
				'text':'11cm超 要相談',
				'price':'error',
				'disables':[
				]
			}
		},
		'default':'none'
	},
	'SNS':{
		'text':'SNS掲載可否',
		'options':{
			'OK':{
				'text':'掲載OK'
			},
			'NG':{
				'text':'掲載NG'
			}
		},
		'default':'OK'
	}
};


//ドロップダウンボックスの取得
function getSelections(){
	let r = [];
	Object.keys(options).forEach(key => {
		r.push({
			'key':key,
			'tag':document.getElementById(key),
			'val':document.getElementById(key).value
		});
	});
	return r;
};


//ドロップダウンボックスの有効化・無効化
function changebox(){
	let selections = getSelections();
	let btn_mail = document.getElementById('btn_mail');
	let btn_copy = document.getElementById('btn_copy');

	let able_set = new Set(Object.keys(options));
	able_set.add('btn_mail');
	able_set.add('btn_copy');

	let disable_set = new Set();
	selections.forEach(sel => {
		let opt = options[sel.key].options[sel.val];
		if ('disables' in opt){
			for (let d of opt.disables){
				disable_set.add(d);
			};
		};
	});

	able_set = able_set.difference(disable_set);

	able_set.forEach(id => {
		if (id!='') document.getElementById(id).disabled = false;
	});
	disable_set.forEach(id => {
		if (id!='') document.getElementById(id).disabled = true;
	});
};

//copyボタン
document.getElementById('btn_copy').onclick = function(){
	let selections = getSelections();

	let honbun = "";
	let totalprice = 0;

	selections.forEach(sel => {
		honbun += options[sel.key].text + '：';
		let opt = options[sel.key].options[sel.val];
		honbun += opt.text+ ' ';
		if ('price' in opt){
			if (Number.isInteger(opt.price)){
				honbun += opt.price.toLocaleString()+'yen';	//価格が決まっている場合
				if (Number.isInteger(totalprice)) totalprice += opt.price;  //要相談でない場合に価格を加算
			}else{
				honbun += opt.price;  //要相談など価格が決められない場合
				totalprice = '要相談';
			};
		};
		honbun += '\n';	//改行コード
	});
	if (Number.isInteger(totalprice)){
		honbun += '\nTotal ' + totalprice.toLocaleString() + 'yen';
	}else{
		honbun += '\nTotal 要相談';
	};
	honbun += "\n";
	honbun += "\n";
	honbun += "イメージデータ添付をしてください。";
	honbun += "\n";
	honbun += " __________________________";
	honbun += "\n";
	honbun += "\n";
	honbun += "お名前：";
	honbun += "\n";
	honbun += "コメント：";

	navigator.clipboard.writeText(honbun).then(e => {
		alert('オーダー内容をコピーできました');
	});
};


//オーダーメール文を作成
//引数：文章作成の順序指定
function write_mail(){
	let selections = getSelections();

	let honbun = "";
	let totalprice = 0;

	selections.forEach(sel => {
		honbun += options[sel.key].text + '：';
		let opt = options[sel.key].options[sel.val];
		honbun += opt.text+ ' ';
		if ('price' in opt){
			if (Number.isInteger(opt.price)){
				honbun += opt.price.toLocaleString()+'yen';	//価格が決まっている場合
				if (Number.isInteger(totalprice)) totalprice += opt.price;  //要相談でない場合に価格を加算
			}else{
				honbun += opt.price;  //要相談など価格が決められない場合
				totalprice = '要相談';
			};
		};
		honbun += '%0D%0A';	//改行コード
	});
	honbun += '%0D%0A' + 'Total ' + totalprice.toLocaleString() + 'yen';

	document.location = "mailto:meetscookie@gmail.com"
	 + "?subject=meetscookieオーダー かんたんお見積り"
	 + "&body="+honbun
	 + "%0D%0A"
	 + "%0D%0Aイメージデータ添付をしてください"
	 + "%0D%0A__________________________"
	 + "%0D%0A%0D%0Aお名前："
	 + "%0D%0Aコメント：";
};


function keisan(){
	let selections = getSelections();

	let totalprice = 0;
	selections.forEach(sel => {
		let opt = options[sel.key].options[sel.val];
		if ('price' in opt){
			if (Number.isInteger(opt.price)){
				if (Number.isInteger(totalprice)) totalprice += opt.price;  //要相談でない場合に価格を加算
			}else{
				totalprice = '要相談';
			};
		};
	});

	if (Number.isInteger(totalprice)){
		document.orderform.field_total.value = "Total   " + totalprice.toLocaleString() + "yen"; // 合計を表示
	}else{
		document.orderform.field_total.value = "Total   要相談";
	};
};

function imgChange(){
	let selections = getSelections();

	let divelement = document.getElementById("sampleimage");

	selections.forEach(sel => {
		let opt = options[sel.key].options[sel.val];
		if ('image' in opt){
			divelement.innerHTML = '<IMG src="img/'+opt.image+'" style="display: block; margin: auto;" name="imgsmp">';
		};
	});
};

const open = document.getElementById('open');
const overlay = document.querySelector('.overlay');
const close = document.getElementById('close');

open.addEventListener('click', ()  =>  {
	overlay.classList.add('show');
	open.classList.add('hide');
});

close.addEventListener('click', ()  =>  {
	overlay.classList.remove('show');
	open.classList.remove('hide');
});

//初期化
window.onload = function() {
	let selections = getSelections();
	selections.forEach(sel => {
		sel.tag.value = options[sel.key].default;
	});
	document.orderform.field_total.value = "";
	changebox();
};

//jQueryを使わずに再現
//$(function() {
//	$('html,body').animate({ scrollTop: 0 }, '1');
//});
