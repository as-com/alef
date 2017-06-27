// list of short problematic classes from EasyList /##\.[_a-zA-Z0-9-]{1,3}[^_a-zA-Z0-9-]/ excluding those containing "ad"

// AT,IBA,MC,MPU,MS,MSL,OAS,PMB,PS,SLL,SRR,Sky,Tr2,WOL,_jH,a,a1,a2,aBx,aKB,a_d,aa,abl,abs,abu,aeF,af,afn,al,ap,apb,atf,az,azN,b1,b2,b3,b60,ba1,ba2,ba3,bar,bga,bl,blq,bms,bn,bnr,box,bt,btf,btn,buy,bvq,c,c4,c_2,caf,cap,cau,ch,crm,cs,cta,da,dcc,ddb,df3,dfp,dl,dlf,drt,dzt,ed,exo,f11,fan,fd,fl,g,g2a,gB,gb,gfp,gg1,gpt,gsf,h,hSR,hb,hd,hws,iab,imu,in,itd,j_b,j_t,job,lb,lbc,lef,m,m10,m20,ma,mat,mb,mbs,md,mod,mpu,mq,msg,mts,mw,nH,nag,oM,oas,oba,odd,one,p,p-2,pB5,pga,pub,q2,qb,ra,red,rek,rev,rg,rh,rif,row,rr,rsp,rtx,s-a,s-s,s9,sa,sep,sjl,sky,slb,sp,spF,spL,svd,tb3,tbl,thx,tla,top,tp,tr1,ts,txt,u4,u5,u9,un,vib,w0,w49,w_e,wau,wd1,wpa,xz,yla
// sorted
const ids = [2, 36, 37, 38, 39, 40, 42, 43, 48, 51, 55, 669, 1420, 1436, 1628, 2305, 2306, 2340, 2345, 2351, 2355, 2365,
	2369, 2370, 2371, 2415, 2417, 2423, 2436, 2475, 2486, 2532, 2543, 2599, 2663, 2671, 2699, 2725, 2789, 2791, 2865,
	2897, 3045, 3108, 3109, 3111, 3124, 3130, 3153, 3222, 3330, 3365, 3428, 3434, 3435, 3445, 3465, 3492, 3507, 3571,
	3574, 3588, 3589, 3593, 3633, 3712, 3837, 74442, 91742, 91925, 98972, 103819, 116053, 116443, 117692, 122178,
	132629, 148219, 148747, 149871, 149878, 149880, 150031, 150129, 150757, 151017, 151383, 151936, 153857, 153858,
	153859, 153909, 154276, 154612, 154678, 154741, 154811, 155113, 155121, 155196, 155252, 157993, 158003, 158008,
	159088, 159204, 162214, 162277, 162371, 162419, 162793, 163191, 163703, 167666, 168001, 170289, 172196, 174707,
	174721, 175351, 175529, 177947, 179894, 182565, 183352, 183783, 187557, 194918, 195113, 196672, 196736, 198967];
const idsLength = ids.length;

export default function isClassnameProblematic(id: number): boolean {
	// binary search the list of ids
	let j = 0;
	let length = idsLength;
	while (j < length) {
		const i = (length + j - 1) >> 1;
		if (id > ids[i]) {
			j = i + 1;
		}
		else if (id < ids[i]) {
			length = i;
		}
		else {
			return true;
		}
	}
	return false;
}
