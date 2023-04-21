export const MENUS: any[] = [
    {
        name: 'Öğrenci İşlemleri',
        route: 'student'
    },
    {
        name: 'Müfredat İşlemleri',
        route: 'curriculum'
    },
    {
        name: 'Ders İşlemleri',
        route: 'course'
    }
];

export const ACCOUNT_MENUS: any = {
    name: '{{USER}}',
    subMenus: [
        {
            name: 'Kimlik Bilgileri',
            route: 'identity'
        },
        {
            name: 'İletişim Bilgileri',
            route: 'contact'
        },
        {
            name: 'Ders İşlemleri',
            route: 'course'
        },
        {
            name: 'logout',
            fn: () => {
                console.log('HOP');
            }
        }
    ]
}