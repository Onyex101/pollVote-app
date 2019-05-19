import { AdminService } from './../../../service/admin/admin.service';
import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  selectedPath = '';
  user = {
    full_name: 'Admin Name',
    email: 'example@gmail.com'
  };

  pages = [
    {
      title: 'Dashboard',
      url: '/menu/dash',
      icon: 'assets/imgs/dash.png'
    },
    {
      title: 'New Poll',
      url: '/menu/new',
      icon: 'assets/imgs/create.png'
    },
    {
      title: 'Pending',
      url: '/menu/pend',
      icon: 'assets/imgs/pending.jpg'
    },
    {
      title: 'Authorised',
      url: '/menu/auth',
      icon: 'assets/imgs/auth.png'
    },
    {
      title: 'Archives',
      url: '/menu/arch',
      icon: 'assets/imgs/archive.png'
    }
  ];

  constructor(
    private router: Router,
    private admin: AdminService
    ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
    this.admin.dashboard().then((val) => {
      const userDetails: any = val;
      this.user = userDetails.user;
      // console.log(this.user);
    }).catch((e) => {
      // console.log(e);
    });
  }

  logout(p) {
    if (p === 'signIn') {
      this.router.navigateByUrl('/admin-login');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
